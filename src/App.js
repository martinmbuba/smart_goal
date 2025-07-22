import React, { useState, useEffect } from 'react';
import GoalForm from './components/GoalForm';
import GoalList from './components/GoalList';
import Overview from './components/Overview';
import api from './api';

function App() {
  const [goals, setGoals] = useState([]);
  const [showGoals, setShowGoals] = useState(false);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const data = await api.getGoals();
      setGoals(data);
    } catch (error) {
      console.error('Failed to fetch goals:', error);
    }
  };

  const addGoal = async (newGoal) => {
    try {
      const createdGoal = await api.createGoal(newGoal);
      setGoals((prevGoals) => [...prevGoals, createdGoal]);
    } catch (error) {
      console.error('Failed to add goal:', error);
    }
  };

  const updateGoal = async (id, updatedFields) => {
    try {
      const updatedGoal = await api.updateGoal(id, updatedFields);
      setGoals((prevGoals) =>
        prevGoals.map((goal) => (goal.id === id ? updatedGoal : goal))
      );
    } catch (error) {
      console.error('Failed to update goal:', error);
    }
  };

  const deleteGoal = async (id) => {
    try {
      await api.deleteGoal(id);
      setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
    } catch (error) {
      console.error('Failed to delete goal:', error);
    }
  };

  const makeDeposit = async (goalId, amount) => {
    try {
      const goal = goals.find((g) => g.id === goalId);
      if (!goal) return;
      const newSavedAmount = (goal.savedAmount || 0) + amount;
      await updateGoal(goalId, { savedAmount: newSavedAmount });
    } catch (error) {
      console.error('Failed to make deposit:', error);
    }
  };

  const markGoalDone = async (goalId) => {
    try {
      const goal = goals.find((g) => g.id === goalId);
      if (!goal) return;
      await updateGoal(goalId, { savedAmount: goal.targetAmount });
    } catch (error) {
      console.error('Failed to mark goal as done:', error);
    }
  };

  return (
    <div className="App" style={{ maxWidth: 800, margin: '0 auto', padding: 20 }}>
      <Overview goals={goals} />
      <GoalForm addGoal={addGoal} />
      <GoalList
        goals={goals}
        updateGoal={updateGoal}
        deleteGoal={deleteGoal}
        makeDeposit={makeDeposit}
        markGoalDone={markGoalDone}
      />
    </div>
  );
}

export default App;
