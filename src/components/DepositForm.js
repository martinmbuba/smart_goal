import React, { useState } from 'react';

function DepositForm({ goals, makeDeposit }) {
  const [depositData, setDepositData] = useState({ amount: '', goalId: '' });

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

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 20 }}>
      <form onSubmit={submitDeposit} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <input
          type="number"
          name="amount"
          value={depositData.amount}
          onChange={handleDepositChange}
          placeholder="Amount"
          min="0"
          step="0.01"
          required
          style={{ width: 100, padding: '5px' }}
        />
        <select
          name="goalId"
          value={depositData.goalId}
          onChange={handleDepositChange}
          required
          style={{ padding: '5px' }}
        >
          <option value="">Select Goal</option>
          {goals.map((goal) => (
            <option key={goal.id} value={goal.id}>
              {goal.name}
            </option>
          ))}
        </select>
        <button type="submit" style={{ padding: '5px 10px' }}>Deposit</button>
      </form>
    </div>
  );
}

export default DepositForm;
