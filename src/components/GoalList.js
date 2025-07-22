import React, { useState } from 'react';

function GoalList({ goals, updateGoal, deleteGoal, makeDeposit, markGoalDone }) {
  const [editingGoalId, setEditingGoalId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [depositData, setDepositData] = useState({ amount: '', goalId: '' });

  const startEditing = (goal) => {
    setEditingGoalId(goal.id);
    setEditFormData({
      name: goal.name,
      targetAmount: goal.targetAmount,
      category: goal.category,
      deadline: goal.deadline,
    });
  };

  const cancelEditing = () => {
    setEditingGoalId(null);
    setEditFormData({});
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = () => {
    updateGoal(editingGoalId, {
      name: editFormData.name,
      targetAmount: Number(editFormData.targetAmount),
      category: editFormData.category,
      deadline: editFormData.deadline,
    });
    cancelEditing();
  };

  const handleDepositChange = (e) => {
    const { name, value } = e.target;
    setDepositData((prev) => ({ ...prev, [name]: value }));
  };

  const submitDeposit = (e) => {
    e.preventDefault();
    const amountNum = Number(depositData.amount);
    if (amountNum > 0 && depositData.goalId) {
      makeDeposit(depositData.goalId, amountNum);
      setDepositData({ amount: '', goalId: '' });
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString();
  };

  const calculateProgress = (goal) => {
    return Math.min((goal.savedAmount / goal.targetAmount) * 100, 100);
  };

  const daysLeft = (goal) => {
    const now = new Date();
    const deadline = new Date(goal.deadline);
    const diffTime = deadline - now;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div>
      <h2>Goals</h2>
      {goals.length === 0 && <p>No goals yet.</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {goals.map((goal) => (
          <li key={goal.id} style={{ border: '1px solid #ccc', marginBottom: 10, padding: 10 }}>
            {editingGoalId === goal.id ? (
              <div>
                <input
                  type="text"
                  name="name"
                  value={editFormData.name}
                  onChange={handleEditChange}
                  placeholder="Name"
                />
                <input
                  type="number"
                  name="targetAmount"
                  value={editFormData.targetAmount}
                  onChange={handleEditChange}
                  placeholder="Target Amount"
                />
                <input
                  type="text"
                  name="category"
                  value={editFormData.category}
                  onChange={handleEditChange}
                  placeholder="Category"
                />
                <input
                  type="date"
                  name="deadline"
                  value={editFormData.deadline}
                  onChange={handleEditChange}
                />
                <button onClick={saveEdit}>Save</button>
                <button onClick={cancelEditing}>Cancel</button>
              </div>
            ) : (
              <div>
                <h3>{goal.name}</h3>
                <p>Category: {goal.category}</p>
                <p>Target Amount: ${goal.targetAmount.toFixed(2)}</p>
                <p>Saved Amount: ${goal.savedAmount.toFixed(2)}</p>
                <p>Deadline: {formatDate(goal.deadline)}</p>
                <p>Days Left: {daysLeft(goal)}</p>
                <div style={{ background: '#eee', height: 20, width: '100%', borderRadius: 5, overflow: 'hidden' }}>
                <div
                    style={{
                      width: calculateProgress(goal) + '%',
                      background: calculateProgress(goal) === 100 ? 'green' : 'blue',
                      height: '100%',
                    }}
                  />
                </div>
                <button onClick={() => startEditing(goal)}>Edit</button>
                <button onClick={() => deleteGoal(goal.id)}>Delete</button>
                <button onClick={() => markGoalDone(goal.id)} style={{ marginLeft: 10 }}>
                  Mark as Done
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GoalList;
