import React, { useState, useEffect } from 'react';
import { Button } from '../UI/Button';
import CodeMirror from "@uiw/react-codemirror";
import './style.css';




export default function Exercise() {
  const [code, setCode] = useState('const a = 0;' +'\n'.repeat(47));


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
    <>
      <div className='Page'>
        <div className="split left">
          <div className="centered">

            <h1>Exercise</h1>

          </div>
        </div>

        <div className="split right">
            <div className="codeField">
              <CodeMirror className='CodeMirror'
                value={code}
                maxHeight='55em'
                minHeight='2em'
                options={{
                  mode: 'javascript',
                  globalVars: true
                  
                }}
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
    </>
  );
}