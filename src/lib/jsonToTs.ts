'use server';
import {
  quicktype,
  InputData,
  jsonInputForTargetLanguage,
} from 'quicktype-core';

export async function convertJsonToTs(
  typeName: string,
  json: string
): Promise<string> {
  const jsonInput = jsonInputForTargetLanguage('typescript');

  await jsonInput.addSource({
    name: typeName,
    samples: [json],
  });

  const inputData = new InputData();
  inputData.addInput(jsonInput);

  const result = await quicktype({
    inputData,
    rendererOptions: {
      'just-types': true,
    },
    lang: 'typescript',
  });

  return result.lines.join('\n');
}
