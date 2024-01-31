import React, { useEffect, useState } from 'react';

import "./Reminders.scss";

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
    <div className='reminders'>
      <h2 className='reminders__title'>Your Medication Reminders</h2>
      <ul className='reminders__main'>
        {reminders.map((reminder, index) => {
          return (
            <li className='reminders__sub' key={index}>
              <strong className='reminders__med'>Medication:</strong> {reminder.medications}, 
              <strong className='reminders__date'>Date:</strong> {reminder.date instanceof Date ? reminder.date.toLocaleDateString() : 'Invalid Date'},
              <strong className='reminders__time'>Time:</strong> {reminder.time.hour}:{reminder.time.minute}, 
              <strong className='reminders__freq'>Frequency:</strong> {reminder.frequency}
              {reminder.days && (
                <div className='reminders__days-cont'>
                  <strong className='reminders__days'>Days:</strong> {reminder.days.join(', ')}
                </div>
              )}
            </li>
          );
        })}
      </ul>
      <div className='reminders__cont'>
        <button className='reminders__button' onClick={clearReminders}>Clear Reminders</button>
      </div>
    </div>
  );
};

export default Reminders;