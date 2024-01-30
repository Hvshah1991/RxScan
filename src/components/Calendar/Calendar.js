import React, { useState } from 'react';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./Calendar.scss";
import CalendarIcon from "../../assets/images/icons/rxscan_2.png"

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

    // Function to handle date change
    const handleDateChange = (date) => {
        const selectedDate = new Date(date);
        onDateChange(selectedDate);
    };
  
    return (
      <div className="calendar">
        <div className='calendar__cont'>
            <h2 className="calendar__title">Calendar</h2>
            <img
                className="calendar__icon"
                src={CalendarIcon}
                alt="calendar-icon"
                />
        </div>
        <ReactCalendar onChange={handleDateChange} value={selectedDate} />
        <div className='calendar__add-cont'>
        <div className='calendar__time-cont'>
          <label className='calendar__time-label' htmlFor="time">Time:</label>
          <div className='calendar__hm-cont'>
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
        <div className='calendar__freq-cont'>
          <label className='calendar__freq-label' htmlFor="frequency">Frequency:</label>
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
      </div>
    );
  };
  
  export default Calendar;