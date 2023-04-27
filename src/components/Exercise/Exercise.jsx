import React, { useState, useEffect } from 'react';
import { Button } from '../UI/Button';
import CodeMirror from "@uiw/react-codemirror";
import './style.css';
import axios from 'axios';
import { python } from '@codemirror/lang-python';



export default function Exercise() {
  const [code, setCode] = useState('const a = 0;' +'\n'.repeat(10));
  const [data, setData] = useState([]);
  const [responseMessage, setResponse] = useState('');
  const [passedMessage, setPassed] = useState('');
  const [failedMessage, setFailed] = useState('');
  const [buttonPressed, setButtonPressed] = useState(false);
  var parts = window.location.href.split("/");
  var currentTaskId = (parts[parts.length - 1]).toString();
  const extensions = [python()];
  const language = "python";

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
    data['type'] = 'exercise';
    var request = data;
    delete request['confirmed'];
    delete request['date'];
    delete request['difficulty'];
    delete request['educational'];
    delete request['id'];
    delete request['problem'];
    delete request['type_id'];
    console.log(request);

    axios
        .post('http://localhost:5163/api/code/checker', request, { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
        
          console.log(response);
          setPassed(response.data["passed"]);
          setFailed(response.data["failed"]);
          console.log(passedMessage);
          console.log(failedMessage);
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
                maxHeight='40em'
                minHeight='2em'
                maxWidth='60.6%'
                
                extensions={extensions}
                hintOptions="false"
                onChange={(editor, change) => {
                  setCode(editor.valueOf())
                }}
              />
            </div>
            <div className="submitButtonDiv">
            <p style={{paddingLeft: '0.2em'}}>{responseMessage}</p>
            {buttonPressed && passedMessage.length > 0 && (
              <table>
                <tbody style={{color: 'green'}}>
                  {passedMessage.map((message, index) => (
                    <tr key={index}>
                      <td>{message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {buttonPressed && failedMessage.length > 0 && (
              <table>
                <tbody style={{color: 'red'}}>
                  {failedMessage.map((message, index) => (
                    <tr key={index}>
                      <td>{message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <Button 
                  style={{width: '100%'}}
                  value="Submit"
                  name="submit-task"
                  onClick={() => {
                    submitCode();
                    setButtonPressed(true);
                  }}  
            />       
            </div>
        </div>

      </div>
    </>
  );
}