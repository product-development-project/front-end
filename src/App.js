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
import JobAdsListPageV2 from './components/JobAds/JobAdsListPageV2';
import JobAdsListPage from './components/JobAds/JobAdsListPage';
import Leaderboard from './components/Leaderboard/Leaderboard';
import Exercises from './components/Exercises/Exercises';
import Task from './components/Exercise/Exercise';
import ProfileForm from './components/Profile/ProfileForm';
import CompanyFunctions from './components/Company/Functions';
import ViewAds from './components/Company/ViewAds';
import ViewLogged from './components/Company/ViewLogged';
import CreateAdds from './components/Company/CreateAds';
import ViewTaskForCompetitionFunction from './components/Company/ViewTaskForCompetition';
import AddTaskForCompetitionFunction from './components/Company/AddTaskToAds';
import AdminFunctionsFunction from './components/Admin/AdminFunctions';
import ApproveCompanies from './components/Admin/ApproveCompaniesFunction';
import ApproveTasks from './components/Admin/ApproveTasksFunction';
import CreateTask from './components/Admin/CreateTaskFunction';
import HelpSectionList from './components/Admin/HelpSectionListFunction';
import JobAdsPage from './components/JobAds/JobAdPage';
import AdExercise from './components/Exercise/AdExercise';

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

          <Route path="job/ads" element={<JobAdsListPageV2 />} />
          <Route path="home/job/ads" element={<JobAdsListPage />} />

          <Route path="home/faq" element={<FAQ />} />
          <Route path="home/contacts" element={<Contacts />} />
          <Route path="home/help" element={<Help />} />

          <Route path="home/Company" element={<CompanyFunctions />} />
          <Route path="home/Company/ViewAds" element={<ViewAds />} />
          <Route path="home/Company/ViewAds/:id" element={<ViewLogged />} />
          <Route path="home/Company/CreateAds" element={<CreateAdds />} />
          <Route path="home/Company/ViewAds/tasks/:id" element={<ViewTaskForCompetitionFunction />} />
          <Route path="/home/Company/ViewAds/Addtask/:id" element={<AddTaskForCompetitionFunction></AddTaskForCompetitionFunction>}></Route>

          <Route path="/home/Admin" element={<AdminFunctionsFunction></AdminFunctionsFunction>}></Route>
          <Route path="/home/Admin/ApproveCompanies" element={<ApproveCompanies></ApproveCompanies>} ></Route>
          <Route path="/home/Admin/ApproveTasks" element={<ApproveTasks></ApproveTasks>}></Route>
          <Route path="/home/Admin/CreateTask" element={<CreateTask></CreateTask>}></Route>
          <Route path="/home/Admin/HelpSection" element={<HelpSectionList></HelpSectionList>}></Route>

          <Route path="/home/ad/:id" element={<JobAdsPage></JobAdsPage>}></Route>
          <Route path="/home/ad/:adId/task/:taskId" element={<AdExercise></AdExercise>}></Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
