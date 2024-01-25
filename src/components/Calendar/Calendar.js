import React, { useState } from 'react';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Calendar = ({ selectedDate, onDateChange }) => {
  return (
    <div>
      <h2>Medication Reminders Calendar</h2>
      <ReactCalendar onChange={onDateChange} value={selectedDate} />
    </div>
  );
};

export default Calendar;