import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogIn from './components/LogIn';
import Register from './components/Register';
import Home from './components/Home'
import Homev2 from './components/Homev2'
import Homev3 from "./components/Homev3";
import Profile from './components/Profile/Profile';
import Help from './components/Help';
import FAQ from './components/FAQ';
import Contacts from './components/Contacts';
import { FileUploader } from "./components/FileUploader";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route index element={
            <Homev3/>
          } />
          <Route path="login" element={<LogIn/>} />
          <Route path="register" element={<Register/>} />
          <Route path="home" element={<Homev2/>} />
          <Route path="jobTasksUpload" element={<FileUploader/>} />

          <Route path="faq" element={<FAQ/>} />
          <Route path="contacts" element={<Contacts/>} />
          <Route path="help" element={<Help/>} />
          <Route path="profile" element={<Profile/>}/>
        </Route>
      </Routes>
    </Router>
  )
};

export default App;
