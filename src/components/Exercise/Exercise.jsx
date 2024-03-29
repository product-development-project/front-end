import React, { useState, useEffect } from 'react';
import { Button } from '../UI/Button';
import CodeMirror from "@uiw/react-codemirror";
import './style.css';
import axios from 'axios';
import { python } from '@codemirror/lang-python';
import { useNavigate } from 'react-router-dom';
import Boilerplate from './CodeGeneration';
import { FaSpinner } from 'react-icons/fa';

export default function Exercise() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [code, setCode] = useState();
  const [responseMessage, setResponse] = useState('');
  const [solutionData, setSolutionData] = useState();
  const [buttonPressed, setButtonPressed] = useState(false);
  const [language, setLanguage] = useState("python3");
  var parts = window.location.href.split("/");
  var currentTaskId = (parts[parts.length - 1]).toString();
  const extensions = [python()];
  const [loading, setLoading] = useState(false);
  const languages = ['python3'];

  useEffect(() => {
    axios(`http://localhost:5163/api/Task/${currentTaskId}`)
      .then(result => {
        setData(JSON.parse(JSON.stringify(result.data)));
        const image = new Image();
        image.src = `data:image/jpeg;base64,${result.data['problem']}`;
        const imgDiv = document.querySelector('.exercise');
        if (!imgDiv.hasChildNodes()) {
          imgDiv.appendChild(image);
        }
        setCode(Boilerplate({ taskName: result.data['name'], type: result.data['type_id'] }));
      })
  }, []);

  const submitCode = event => {
    setLoading(true);
    var exerciseName = data['name'];
    var request = {
      'language': language,
      'type': 'exercise',
      'name': exerciseName,
      'code': code,
      'taskId': currentTaskId,
      'userId': localStorage.getItem('id')
    }

    axios
      .post('http://localhost:5163/api/code/checker', request, { headers: { 'Content-Type': 'application/json' } })
      .then(response => {
        setSolutionData(JSON.parse(JSON.stringify(response.data)));
        setLoading(false);
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
          <div className="dropdownContainer" style={{ paddingLeft: '0.8em' }}>
            <select
              className="dropdown"
              value={language}
              style={{ background: 'rgb(211, 209, 209)' }}
              onChange={event => setLanguage(event.target.value)}
            >
              <option value="python3">Python 3</option>
            </select>
          </div>
          <div className="codeField">
            <CodeMirror className='CodeMirror'
              value={code}
              maxHeight='40em'
              minHeight='2em'
              maxWidth='60.6%'
              extensions={extensions}
              onChange={(editor, change) => {
                setCode(editor.valueOf())
              }}
            />
          </div>
          <div className="submitButtonDiv">
            <p style={{ paddingLeft: '0.2em' }}>{responseMessage}</p>
            {loading && (
              <div className="loadingSpinnerContainer">
                <FaSpinner className="loadingSpinner" spin="true" size={40} />
              </div>
            )}
            {buttonPressed && solutionData?.passed?.length > 0 && (
              <table style={{ width: '100%' }}>
                <tbody style={{ color: 'green' }}>
                  {solutionData.passed.map((message, index) => (
                    <tr key={index}>
                      <td style={{ background: 'rgb(211, 209, 209)', color: 'rgb(0, 255, 50, 0.8)', fontWeight: 'bold' }}>
                        {message}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {buttonPressed && solutionData?.failed?.length > 0 && (
              <table style={{ width: '100%' }}>
                <tbody style={{ color: 'red' }}>
                  {solutionData.failed.map((message, index) => (
                    <tr key={index}>
                      <td style={{ background: 'rgb(211, 209, 209)', color: 'rgb(255, 0, 0, 1)', fontWeight: 'bold' }}>
                        {message}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {solutionData != undefined ?
              <div className="stats" style={{ color: 'white' }}>
                <p>Run Time: {solutionData.runTime}s</p>
                <p>Memory Usage: {solutionData.memoryUsage?.toFixed(4)}KB</p>
                <p>Correctness Points: {solutionData.taskPoints}, RunTime Points: {solutionData.runTimePoints}, RAM Usage Points: {solutionData.memoryUsagePoints}</p>
              </div>
              :
              <></>
            }
            <Button
              style={{ width: '30%', float: 'right' }}
              value="Submit"
              name="submit-task"
              onClick={() => {
                submitCode();
                setButtonPressed(true);
              }}
            />
            <Button
              style={{ width: '30%' }}
              value="Back"
              name="back-button"
              onClick={() => {
                navigate(-1);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}