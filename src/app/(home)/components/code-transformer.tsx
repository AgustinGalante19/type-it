'use client';

import { Code } from 'lucide-react';
import { json } from '@codemirror/lang-json';
import { javascript } from '@codemirror/lang-javascript';
import CodeEditor from '@/components/ui/code-editor';
import Button from '@/components/ui/button';
import CopyButton from '@/components/ui/copy-button';
import type { TransformMode } from '../page';
import useCodeTransformer from '../hooks/useCodeTransformer';

function CodeTransformer({ transformMode }: { transformMode: TransformMode }) {
  const { jsonValue, tsValue, handleParseCode, handleChangeCodeEditor } =
    useCodeTransformer({
      transformMode,
    });

  return (
    <div>
      <div className='grid grid-cols-2 items-center'>
        <div className='flex gap-2 items-center'>
          <code className='text-sm font-semibold'>JSON</code>
          <Button
            size='icon'
            variant='ghost'
            title='Format'
            onClick={handleParseCode}
          >
            <Code className='text-primary' />
          </Button>
        </div>
        <div className='flex gap-2 items-center'>
          <code className='text-sm font-semibold'>TypeScript</code>
          <CopyButton textToCopy={tsValue} />
        </div>
      </div>
      <div className='grid grid-cols-2 max-sm:grid-cols-1 gap-4'>
        <div>
          <CodeEditor
            style={{ fontSize: '16px' }}
            value={jsonValue}
            height='700px'
            extensions={[json()]}
            onChange={handleChangeCodeEditor}
          />
        </div>
        <div>
          <CodeEditor
            style={{ fontSize: '16px' }}
            value={tsValue}
            height='700px'
            extensions={[javascript({ typescript: true })]}
            editable={false}
          />
        </div>
      </div>
    </div>
  );
}

export default CodeTransformer;
