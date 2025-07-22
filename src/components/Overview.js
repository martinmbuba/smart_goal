import React from 'react';

function Overview({ goals }) {
  const totalGoals = goals.length;
  const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);
  const goalsCompleted = goals.filter((goal) => goal.savedAmount >= goal.targetAmount).length;

  const now = new Date();

  const getDaysLeft = (deadline) => {
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - now;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <h2>Overview</h2>
      <p>Total Goals: {totalGoals}</p>
      <p>Total Money Saved: ${totalSaved.toFixed(2)}</p>
      <p>Goals Completed: {goalsCompleted}</p>
      <ul>
        {goals.map((goal) => {
          const daysLeft = getDaysLeft(goal.deadline);
          const isCompleted = goal.savedAmount >= goal.targetAmount;
          const isWarning = daysLeft <= 30 && daysLeft >= 0 && !isCompleted;
          const isOverdue = daysLeft < 0 && !isCompleted;

          return (
            <li key={goal.id} style={{ marginBottom: 5 }}>
              <strong>{goal.name}</strong> - {daysLeft} day{daysLeft !== 1 ? 's' : ''} left
              {isWarning && <span style={{ color: 'orange', marginLeft: 10 }}>⚠️ Deadline approaching</span>}
              {isOverdue && <span style={{ color: 'red', marginLeft: 10 }}>❌ Overdue</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Overview;
