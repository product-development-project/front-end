import TopBar from '../TopBar';
import { Button } from '../UI/Button';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';
import './style.css';
import axios from 'axios';

//NEKISTI KONSTANTOS IŠ VISO BE MANO LEIDIMO AČIŪ
const difficulties = {
  difficultiesInner:[
    'Choose',
    'Easy',
    'Medium',
    'Hard'
    ]
};

//NEKISTI KONSTANTOS IŠ VISO BE MANO LEIDIMO AČIŪ
const exercises = {
  exercisesInner:[
    'Choose',
    'Integer manipulation',
    'Array manipulation',
    'Date manipulation',
    'Nested array manipulation',
    'String manipulation',
    'Linked list manipulation',
    'Regular expressions'
  ]
}


export default function Exercises() {

  
  const navigate = useNavigate();
  const [difficultiesSelection, setDifficulty] = useState(difficulties.difficultiesInner[0])
  const [exerciseTypeSelection, setTopic] = useState(exercises.exercisesInner[0]);
  const [data, setData] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    axios("http://localhost:5163/api/Task")
      .then(result => {
        setData(JSON.parse(JSON.stringify(result.data)));
      })
    }, []);     


  useEffect(() => {
    fetchExercises();
    fetchExercisesTypes();
  }, [navigate, difficultiesSelection, exerciseTypeSelection]);

  async function fetchExercises()
  {
        //NEKISTI METODO IŠ VISO BE MANO LEIDIMO AČIŪ
        let test = 0;
        if(exerciseTypeSelection === 'Choose')
        {
          test = 0;
        }else if(exerciseTypeSelection === 'Integer manipulation')
        {
          test = 1;
        }else if(exerciseTypeSelection === 'Array manipulation')
        {
          test = 2;
        }else if(exerciseTypeSelection === 'Date manipulation')
        {
          test = 3;
        }else if(exerciseTypeSelection === 'Nested array manipulation')
        {
          test = 4;
        }else if(exerciseTypeSelection === 'String manipulation')
        {
          test = 5;
        }else if(exerciseTypeSelection === 'Linked list manipulation')
        {
          test = 6;
        }else if(exerciseTypeSelection === 'Regular expressions')
        {
          test = 7;
        }
        //NEKISTI METODO IŠ VISO BE MANO LEIDIMO AČIŪ
        let result = await axios.get(`http://localhost:5163/api/Task/${difficultiesSelection}/${test}`, { headers: { 'Content-Type': 'application/json'}})
        setData(JSON.parse(JSON.stringify(result.data)));
        console.log(difficultiesSelection);
        console.log(exerciseTypeSelection);
  }

  async function fetchExercisesTypes()
  {
        let result = await axios.get(`http://localhost:5163/api/TaskType`, { headers: { 'Content-Type': 'application/json'}})
        setTypes(JSON.parse(JSON.stringify(result.data)));
  }


  return (
    <>
      <TopBar
        title='workIT'
        backButtonDisabled={true}
      >
        <Button
          value="Profile"
          name="profile-button"
          onClick={() => navigate('/home/profile')}
          style={{
            marginTop: '15px'
          }}
        />
        <Button
          value="Leaderboard"
          name="leaderboard-button"
          onClick={() => navigate('/home/leaderboard')}
          style={{
            marginTop: '15px'
          }}
        />
        <Button
          value="Exercise"
          name="exercise-button"
          onClick={() => navigate('/home/exercises')}
          style={{
            marginTop: '15px'
          }}
        />
        <Button
          value="Job competition"
          name="job-competition-button"
          onClick={() => navigate('/home/job/ads')}
          style={{
            marginTop: '15px'
          }}
        />
      </TopBar>

      <div className="App">
        <div className="columns-container">
          <div className="column">
            <h2>Difficulty</h2>
            <select value={difficultiesSelection} onChange={(e) => setDifficulty(e.target.value)}>
              {difficulties.difficultiesInner.map((difficulty) => (
                <option key={difficulty} value={difficulty}>{difficulty}</option>
              ))}
            </select>
          </div>
          <div className="column">
            <h2>Exercise Type</h2>
            <select value={exerciseTypeSelection} onChange={(e) => setTopic(e.target.value)}>
              {exercises.exercisesInner.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
        <div className='Exercises'>
        <table>
          {
            data.map((task) =>
              <tr>
                <td>{task.id}</td>
                <td>{task.name}</td>
                <td>{task.difficulty}</td>
                <td>{types.map((t) => {
                    if (task.type_id === t.id) {
                      return t.name;
                    }})}
                </td>
                <td><Button
                    value="Try out"
                    name="go-to-task"
                    onClick={() => navigate('/home/task/'+task.id)}
                /></td>
              </tr>
              )
          }
        </table>
        </div>

      </div>
    </>
  );
};