import React, { useState } from 'react';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Calendar = ({
    selectedDate,
    onDateChange,
    reminderDetails,
    onTimeChange,
    onFrequencyChange,
  }) => {
    // Options for hours
    const hourOptions = Array.from({ length: 24 }, (_, i) => ({
      value: i.toString().padStart(2, '0'),
      label: i.toString().padStart(2, '0'),
    }));
  
    // Options for minutes
    const minuteOptions = Array.from({ length: 60 }, (_, i) => ({
      value: i.toString().padStart(2, '0'),
      label: i.toString().padStart(2, '0'),
    }));
  
    // Predefined frequency options
    const frequencyOptions = [
      { value: 'Daily', label: 'Daily' },
      { value: 'Every Other Day', label: 'Every Other Day' },
      { value: 'Weekly', label: 'Weekly' },
    ];
  
    return (
      <div>
        <h2>Medication Reminders Calendar</h2>
        <ReactCalendar onChange={onDateChange} value={selectedDate} />
        <div>
          <label htmlFor="time">Time:</label>
          <div>
            <select
              id="hour"
              value={reminderDetails.hour}
              onChange={(e) => onTimeChange('hour', e.target.value)}
            >
              {hourOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            :
            <select
              id="minute"
              value={reminderDetails.minute}
              onChange={(e) => onTimeChange('minute', e.target.value)}
            >
              {minuteOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="frequency">Frequency:</label>
          <select
            id="frequency"
            value={reminderDetails.frequency}
            onChange={(e) => onFrequencyChange(e.target.value)}
          >
            {frequencyOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  };
  
  export default Calendar;