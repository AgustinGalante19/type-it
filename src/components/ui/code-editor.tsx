import React from 'react';
import createTheme from '@uiw/codemirror-themes';
import { tags as t } from '@lezer/highlight';
import ReactCodeMirror, {
  type ReactCodeMirrorProps,
} from '@uiw/react-codemirror';

const myTheme = createTheme({
  theme: 'dark',
  settings: {
    background: '#1d1b20',
    foreground: '#ebdcff',
    caret: '#AEAFAD',
    selection: '#49454e',
    selectionMatch: '#503c74',
    gutterBackground: '#3b383e',
    gutterForeground: '#ebdcff',
    gutterBorder: '#ffffff',
    gutterActiveForeground: '',
    lineHighlight: '#49454e',
  },
  styles: [
    { tag: t.comment, color: '#ebdcff' },
    { tag: t.definition(t.typeName), class: 'text-[#ffdea8]' },
    { tag: t.typeName, color: '#cdc2db' },
    { tag: t.tagName, color: '#276a49' },
    { tag: t.variableName, color: '#775a03' },
    { tag: t.propertyName, color: '#d4bbfc' },
    { tag: t.namespace, color: '#ff0000' },
    { tag: t.string, color: '#adf2c7' },
    { tag: t.number, color: '#ffb4ab' },
    { tag: t.bool, color: '#ffdea8' },
    { tag: t.keyword, class: 'text-[#eadef7] font-semibold' },
  ],
});

function CodeEditor(props: ReactCodeMirrorProps) {
  return (
    <ReactCodeMirror
      style={{ fontSize: '16px' }}
      theme={myTheme}
      height='500px'
      {...props}
    />
  );
}

export default CodeEditor;
