import React, { useEffect, useState } from 'react';

const Reminders = () => {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    // Fetching Reminders from local storage
    const storedReminders = JSON.parse(localStorage.getItem('reminders')) || [];
    // Parse date strings back into Date objects
    const remindersWithDates = storedReminders.map(reminder => ({
        ...reminder,
        date: new Date(reminder.date), // Parse string to Date
    }));
    setReminders(remindersWithDates);
  }, []);

  const clearReminders = () => {
    localStorage.removeItem('reminders');
    setReminders([]);
  };


  return (
    <div>
      <h2>Your Medication Reminders</h2>
      <ul>
        {reminders.map((reminder, index) => {
          console.log('Is date instance of Date?', reminder.date instanceof Date);
          return (
            <li key={index}>
              <strong>Medication:</strong> {reminder.medications}, <strong>Date:</strong>{' '}
              {reminder.date instanceof Date ? reminder.date.toLocaleDateString() : 'Invalid Date'},
              <strong>Time:</strong> {reminder.time.hour}:{reminder.time.minute}, <strong>Frequency:</strong> {reminder.frequency}
            </li>
          );
        })}
      </ul>
      <button onClick={clearReminders}>Clear Reminders</button>
    </div>
  );
};

export default Reminders;