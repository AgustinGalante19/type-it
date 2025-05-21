import React from 'react';
import createTheme from '@uiw/codemirror-themes';
import { tags as t } from '@lezer/highlight';
import ReactCodeMirror, { ReactCodeMirrorProps } from '@uiw/react-codemirror';

const myTheme = createTheme({
  theme: 'dark',
  settings: {
    background: '#171717',
    backgroundImage: '',
    foreground: '#cfcfcf',
    caret: '#AEAFAD',
    selection: '#383838',
    selectionMatch: '#575757',
    gutterBackground: '#1c1c1c',
    gutterForeground: '#4D4D4C',
    gutterBorder: '#ffffff',
    gutterActiveForeground: '',
    lineHighlight: '#212121',
  },
  styles: [
    { tag: t.comment, color: '#787b80' },
    { tag: t.definition(t.typeName), color: '#fdcc34' },
    { tag: t.typeName, color: '#fdcc34' },
    { tag: t.tagName, color: '#008a02' },
    { tag: t.variableName, color: '#775a03' },
    { tag: t.propertyName, color: '#f79f3b' },
    { tag: t.namespace, color: '#ff0000' },
    { tag: t.string, color: '#b2f089' },
    { tag: t.number, color: '#d37409' },
    { tag: t.bool, color: '#fb5b5b' },
    { tag: t.keyword, color: '#ffffff' },
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
