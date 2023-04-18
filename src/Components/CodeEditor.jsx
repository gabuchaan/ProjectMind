import React from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/ext-language_tools';

const CodeEditor = () => {
  return (
    <div className='bg-gray-100 w-full h-72 mt-3 rounded-md'>
      <AceEditor
        mode='javascript'
        theme='github'
        width='100%'
        height='100%'
        name='editor'
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
          highlightActiveLine: false, // Activa la opción de resaltar la línea activa
          highlightGutterLine: true,
        }}
        className='bg-white dark:bg-bars border text-white border-gray-500 rounded-md shadow-md' // Agrega las clases de TailwindCSS que deseas utilizar aquí
      />
    </div>
  );
};

export default CodeEditor;
