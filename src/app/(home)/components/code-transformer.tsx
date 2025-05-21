'use client';

import { useEffect, useState } from 'react';
import { Code } from 'lucide-react';
import { json } from '@codemirror/lang-json';
import { javascript } from '@codemirror/lang-javascript';
import CodeEditor from '@/components/ui/code-editor';
import Button from '@/components/ui/button';
import { convertJsonToTs } from '@/lib/jsonToTs';
import CopyButton from '@/components/ui/copy-button';
import type { TransformMode } from '../page';
import convertJsonToState from '@/lib/jsonToState';

function CodeTransformer({ transformMode }: { transformMode: TransformMode }) {
  const [jsonValue, setJsonValue] = useState('');
  const [tsValue, setTsValue] = useState('');

  useEffect(() => {
    const onChangeOption = async () => {
      console.log('render');
      if (jsonValue) {
        if (transformMode === 'interface') {
          const output = await convertJsonToTs('Root', jsonValue);
          setTsValue(output);
        } else {
          const output = convertJsonToState(jsonValue);
          setTsValue(output);
        }
      }
    };
    onChangeOption();
  }, [transformMode, jsonValue]);

  const handleJsonChange = async (value: string) => {
    if (!value) return;

    setJsonValue(value);
    if (transformMode === 'interface') {
      try {
        const output = await convertJsonToTs('Root', value);
        setTsValue(output);
      } catch (err) {
        console.log(err);
        setTsValue('// Error: JSON inválido');
      }
    } else {
      const output = convertJsonToState(value);
      setTsValue(output);
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
      <div className='grid grid-cols-2 max-sm:grid-cols-1 gap-4'>
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
