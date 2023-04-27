import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogIn from './components/LogIn';
import Register from './components/Register';
import Home from './components/Home';
import Homev2 from './components/Homev2';
import Profile from './components/Profile/Profile';
import Help from './components/Help';
import FAQ from './components/FAQ';
import Contacts from './components/Contacts';
import JobAds from './components/JobAds/JobAdsListPage';
import { FileUploader } from './components/FileUploader';
import Leaderboard from './components/Leaderboard/Leaderboard';
import Exercises from './components/Exercises/Exercises';
import Task from './components/Exercise/Exercise';
import ProfileForm from './components/Profile/ProfileForm';
import CompanyFunctions from './components/Company/Functions';
import ViewAds from './components/Company/ViewAds';
import ViewLogged from './components/Company/ViewLogged';
import CreateAdds from './components/Company/CreateAds';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route index element={
            <Home />
          } />
          <Route path="login" element={<LogIn />} />
          <Route path="register" element={<Register />} />
          <Route path="home" element={<Homev2 />} />

          <Route path="home/profile" element={<Profile />} />
          <Route path="home/profile/edit/:id" element={<ProfileForm />} />

          <Route path="home/leaderboard" element={<Leaderboard />} />

          <Route path="home/exercises" element={<Exercises />} />
          <Route path="home/task/:id" element={<Task />} />

          <Route path="job/ads" element={<JobAds />} />
          <Route path="home/job/ads" element={<JobAds />} />
          <Route path="home/job/ads/upload" element={<FileUploader />} />

          <Route path="home/faq" element={<FAQ />} />
          <Route path="home/contacts" element={<Contacts />} />
          <Route path="home/help" element={<Help />} />

          <Route path="home/Company" element={<CompanyFunctions />} />
          <Route path="home/Company/ViewAds" element={<ViewAds/>}/>
          <Route path="home/Company/ViewAds/:id" element={<ViewLogged/>}/>
          <Route path="home/Company/CreateAds" element={<CreateAdds/>}/>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
