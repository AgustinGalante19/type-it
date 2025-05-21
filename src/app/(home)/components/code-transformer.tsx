'use client';

import { useState } from 'react';
import { Code, Copy } from 'lucide-react';
import { json } from '@codemirror/lang-json';
import { javascript } from '@codemirror/lang-javascript';
import CodeEditor from '@/components/ui/code-editor';
import Button from '@/components/ui/button';
import { convertJsonToTs } from '@/lib/jsonToTs';
import CopyButton from '@/components/ui/copy-button';

function CodeTransformer() {
  const [jsonValue, setJsonValue] = useState('');
  const [tsValue, setTsValue] = useState('');

  const handleJsonChange = async (value: string) => {
    setJsonValue(value);
    try {
      const output = await convertJsonToTs('Root', value);
      setTsValue(output);
    } catch (err) {
      setTsValue('// Error: JSON inválido');
    }
  };

  return (
    <div>
      <div className='grid grid-cols-2 items-center'>
        <div className='flex gap-2 items-center'>
          <code className='text-sm font-semibold'>JSON</code>
          <Button
            size='icon'
            variant='ghost'
            title='Format'
            onClick={() => {
              try {
                const parsed = JSON.parse(jsonValue);
                const formatted = JSON.stringify(parsed, null, 2);
                setJsonValue(formatted);
              } catch (err) {
                alert('JSON inválido');
              }
            }}
          >
            <Code className='text-primary' />
          </Button>
        </div>
        <div className='flex gap-2 items-center'>
          <code className='text-sm font-semibold'>TypeScript</code>
          <CopyButton textToCopy={tsValue} />
        </div>
      </div>
      <div className='grid grid-cols-2 max-sm:grid-cols-1 gap-4 h-[80vh]'>
        <div>
          <CodeEditor
            style={{ fontSize: '16px' }}
            value={jsonValue}
            height='500px'
            extensions={[json()]}
            onChange={handleJsonChange}
          />
        </div>
        <div>
          <CodeEditor
            style={{ fontSize: '16px' }}
            value={tsValue}
            height='500px'
            extensions={[javascript({ typescript: true })]}
            editable={false}
          />
        </div>
      </div>
    </div>
  );
}

export default CodeTransformer;
