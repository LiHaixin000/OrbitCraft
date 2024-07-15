// frontend/src/components/ExpertiseDropdown.js
import React from 'react';
import { expertiseOptions } from './expertiseOptions';

const ExpertiseDropdown = ({ value, onChange }) => {
  return (
    <select value={value} onChange={onChange}>
      <option value="">Select an expertise</option>
      {expertiseOptions.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default ExpertiseDropdown;
