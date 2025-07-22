import axios from 'axios';

// Replace with your Render deployment URL
const API_URL = 'https://smart-goal-v2sk.onrender.com/goals';

const api = {
  getGoals: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  createGoal: async (goal) => {
    const response = await axios.post(API_URL, goal);
    return response.data;
  },

  updateGoal: async (id, updatedFields) => {
    const response = await axios.patch(API_URL + '/' + id, updatedFields);
    return response.data;
  },

  deleteGoal: async (id) => {
    await axios.delete(API_URL + '/' + id);
  }
};

export default api;
