import React, { useState, useEffect } from 'react';
import { Button } from '../UI/Button';
import Editor from "@monaco-editor/react";
import './style.css';



export default function Exercise() {
  const [code, setCode] = useState('a = 0');


  const submitCode = () => {
    console.log(code);
  }

  const editorOptions = {
    automaticLayout: true,
    renderLineHighlight: 'none',
    quickSuggestions: false, // disables autocompletion
    quickSuggestionsDelay: 0,
    // Add any other custom editor options here
  };
  

  return (
    <div className='Page'>
      <div className="split left">
        <div className="centered">

          <h1>Exercise</h1>

        </div>
      </div>

      <div className="split right">
          <div className="codeField" contenteditable="false">
            <Editor className='monaco-editor'
              language="javascript"
              theme="vs-dark"
              defaultValue="// start coding here"
              onChange={setCode}
              options={editorOptions}
            />
          </div>
          <div className="submitButtonDiv">
            <Button 
                value="Submit"
                name="submit-task"
                onClick={() => submitCode()}
                
            />
          </div>
      </div>
      
    </div>
  );
}