import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/Activities').then((response) => {
      if (response.data) {
        setActivities(response.data);
      }
    })
  }, [])

  const handleSelectActivity = (selectedActivityId: string) => {
    setSelectedActivity(activities.find(activity => activity.id === selectedActivityId));
  }

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  }

  const handleFormOpen = (id?: string) => {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  const handleFormClose = () => {
    setEditMode(false);
  }

  const handleCreateOrEditActivity = (newlyOrUpdatedActivity: Activity) => {
    newlyOrUpdatedActivity.id
      ? setActivities([...activities.filter(activity => activity.id !== newlyOrUpdatedActivity.id), newlyOrUpdatedActivity])
      : setActivities([...activities, { ...newlyOrUpdatedActivity, id: uuid() }])
    setEditMode(false)
    setSelectedActivity(newlyOrUpdatedActivity);
  }

  const handleDeleteActivity = (selectedActivityId: string) => {
    setActivities([...activities.filter(activity => activity.id !== selectedActivityId)]);
  }

  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </>
  );
}

export default App;
