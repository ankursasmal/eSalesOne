import React, { useState } from 'react';

const PhonePePayment = () => {
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const paise = parseInt(amount) * 100;

    try {
      const res = await fetch('http://localhost:8000/api/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: paise, userId: 'react_user' }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Payment failed');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Something went wrong');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Pay with PhonePe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Amount (₹):
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </label>
        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
};

export default PhonePePayment;
