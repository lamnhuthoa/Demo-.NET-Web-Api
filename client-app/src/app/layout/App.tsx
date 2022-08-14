import React from 'react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import TestErrors from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';

function App() {
  const location = useLocation();

  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar />
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='activities' element={<ActivityDashboard />} />
        <Route path='activities/:id' element={<ActivityDetails />} />
        <Route key={location.key} path={'manage'} element={<ActivityForm />}>
          <Route path='createActivity' element={<ActivityForm />} />
          <Route path=':id' element={<ActivityForm />} />
        </Route>
        <Route path='/errors' element={<TestErrors />} />
        <Route path='/not-found' element={<NotFound />} />
        <Route path='/server-error' element={<ServerError />} />
      </Routes>
    </>
  );
}

export default observer(App);
