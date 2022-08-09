import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Activities.list().then((response) => {
      let activities: Activity[] = [];
      response.forEach(activity => {
        activity.date = activity.date.split('T')[0];
        activities.push(activity);
      })
      setActivities(activities);
      setLoading(false);
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
    setSubmitting(true);
    if (newlyOrUpdatedActivity.id) {
      agent.Activities.update(newlyOrUpdatedActivity).then(() => {
        setActivities([...activities.filter(activity => activity.id !== newlyOrUpdatedActivity.id), newlyOrUpdatedActivity]);
        setSelectedActivity(newlyOrUpdatedActivity);
        setEditMode(false);
        setSubmitting(false);
      })
    } else {
      newlyOrUpdatedActivity.id = uuid();
      agent.Activities.create(newlyOrUpdatedActivity).then(() => {
        setActivities([...activities, newlyOrUpdatedActivity]);
        setSelectedActivity(newlyOrUpdatedActivity);
        setEditMode(false);
        setSubmitting(false);
      })
    }
    // newlyOrUpdatedActivity.id
    //   ? setActivities([...activities.filter(activity => activity.id !== newlyOrUpdatedActivity.id), newlyOrUpdatedActivity])
    //   : setActivities([...activities, { ...newlyOrUpdatedActivity, id: uuid() }])
    // setEditMode(false)
    // setSelectedActivity(newlyOrUpdatedActivity);
  }

  const handleDeleteActivity = (selectedActivityId: string) => {
    setSubmitting(true);
    agent.Activities.delete(selectedActivityId).then(() => {
      setActivities([...activities.filter(activity => activity.id !== selectedActivityId)]);
      setSubmitting(false);
    })
  }

  if (loading) return <LoadingComponent content='Loading app' />

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
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default App;
