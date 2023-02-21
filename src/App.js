import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogIn from './components/LogIn';
import Register from './components/Register';
import Home from './components/Home'
import Homev2 from './components/Homev2'
import Profile from './components/Profile/Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route index element={
            <Homev2/>
          } />
          <Route path="login" element={<LogIn/>} />
          <Route path="register" element={<Register/>} />
          <Route path="home" element={<Home/>} />

          <Route path="profile" element={<Profile/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
