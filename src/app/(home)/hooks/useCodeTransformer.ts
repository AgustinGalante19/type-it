import { useEffect, useState } from 'react';
import convertJsonToTs from '@/lib/jsonToTs';
import convertJsonToState from '@/lib/jsonToState';
import converJsonToCvmColDef from '@/lib/cvm/grid/columns/jsonToCvmColDef';
import converJsonToAGColDef from '@/lib/cvm/grid/columns/jsonToAGColDef';
import converJsonToRowData from '@/lib/cvm/grid/rows/jsonToData';
import type { TransformMode } from '../page';

export default function useCodeTransformer({
  transformMode,
}: {
  transformMode: TransformMode;
}) {
  const [jsonValue, setJsonValue] = useState('');
  const [tsValue, setTsValue] = useState('');

  useEffect(() => {
    const onChangeOption = async () => {
      try {
        if (jsonValue) {
          let output = '';
          if (transformMode === 'interface') {
            output = await convertJsonToTs('Root', jsonValue);
          } else if (transformMode === 'initialState') {
            output = convertJsonToState(jsonValue);
          } else if (transformMode === 'cvmColDef') {
            output = converJsonToCvmColDef(JSON.parse(jsonValue));
          } else if (transformMode === 'agColDef') {
            output = converJsonToAGColDef(jsonValue);
          } else if (transformMode === 'rowData') {
            output = converJsonToRowData(jsonValue);
          }
          setTsValue(output);
        } else {
          setTsValue('');
        }
      } catch {
        setTsValue('JSON inválido');
      }
    };
    onChangeOption();
  }, [transformMode, jsonValue]);

  const handleParseCode = () => {
    try {
      const parsed = JSON.parse(jsonValue);
      const formatted = JSON.stringify(parsed, null, 2);
      setJsonValue(formatted);
    } catch (err) {
      setJsonValue('JSON inválido');
    }
  };

  const handleChangeCodeEditor = (value: string) => setJsonValue(value);

  return { jsonValue, tsValue, handleParseCode, handleChangeCodeEditor };
}
