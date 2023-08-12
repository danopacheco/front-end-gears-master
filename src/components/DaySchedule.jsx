import React from 'react';
// import '../css/Rooster.css';

const DaySchedule = ({ day, schedule, onTimeChange }) => {
  const handleTimeInputChange = (field, event) => {
    onTimeChange(day, field, event.target.value);
  };

  return (
    <div className="day-schedule">
      <h4>{day}</h4>
      <div className="time-inputs">
        <div>
          <label>Start Time:</label>
          <input
            type="time"
            value={schedule.startTime || ''}
            onChange={(event) => handleTimeInputChange('startTime', event)}
          />
        </div>
        <div>
          <label>End Time:</label>
          <input
            type="time"
            value={schedule.endTime || ''}
            onChange={(event) => handleTimeInputChange('endTime', event)}
          />
        </div>
      </div>
    </div>
  );
};

export default DaySchedule;
