import React, { useState, useEffect } from 'react';
import { Button } from '../UI/Button';
import CodeMirror from "@uiw/react-codemirror";
import './style.css';
import axios from 'axios';


export default function Exercise() {
  const [code, setCode] = useState('const a = 0;' +'\n'.repeat(10));
  const [data, setData] = useState([]);
  const [responseMessage, setResponse] = useState('');
  var parts = window.location.href.split("/");
  var currentTaskId = (parts[parts.length - 1]).toString();
  const language = "csharp";

  useEffect(() => {
    axios(`http://localhost:5163/api/Task/${currentTaskId}`)
      .then(result => {
        setData(JSON.parse(JSON.stringify(result.data)));
        const image = new Image();
        image.src = `data:image/jpeg;base64,${result.data['problem']}`;
        const imgDiv = document.querySelector('.exercise');
        if(!imgDiv.hasChildNodes())
        {
          imgDiv.appendChild(image);
        }
      })
    }, []);    
    
  const submitCode = event => {
    data['language'] = language;
    data['code'] = code;
    delete data['problem'];
    var request = data;

    axios.post('http://localhost:5163/api/code/checker', request, { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
          console.log(response);
          setResponse(response);
        })
        .catch(error => {
          if (error.request) {
            console.warn('Request failed:', error.request);
            setResponse('Request failed');
          } else {
            console.warn('Error:', error.message);
            setResponse(error.message);
          }
        });    
  };


  return (
    <>
      <div className='Page'>
        <div className="split left">
          <div className="exercise">

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
                onChange={(editor, change) => {
                  setCode(editor.valueOf())
                }}
              />
            </div>
            <div className="submitButtonDiv">
            <p style={{paddingLeft: '0.2em'}}>{responseMessage}</p>
              <Button 
                  style={{width: '100%'}}
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