import React, { useEffect, useState } from 'react';

const Reminders = () => {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    // Fetching Reminders from local storage
    const storedReminders = JSON.parse(localStorage.getItem('reminders')) || [];
    setReminders(storedReminders);
  }, []);

  const clearReminders = () => {
    localStorage.removeItem('reminders');
    setReminders([]);
    };

  return (
    <div>
      <h2>Your Medication Reminders</h2>
      <ul>
            {reminders.map((reminder, index) => (
        <li key={index}>
            <strong>Medication:</strong> {reminder.medication}, <strong>Date:</strong>{' '}
            {reminder.date instanceof Date ? reminder.date.toLocaleDateString() : 'Invalid Date'},
            <strong>Time:</strong> {reminder.time.hour}:{reminder.time.minute}, <strong>Frequency:</strong> {reminder.frequency}
        </li>
        ))}
      </ul>
      <button onClick={clearReminders}>Clear Reminders</button>
    </div>
  );
};

export default Reminders;