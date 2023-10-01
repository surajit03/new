import React from 'react';

const Input = ({ name, handleChange, label, half, autoFocus, type, value, multiline, rows }) => (
  <div className={`input-wrapper ${half ? 'half' : ''}`}>
    <label htmlFor={name}>{label}</label>
    <input
      id={name}
      name={name}
      value={value}
      onChange={handleChange}
      required
      autoFocus={autoFocus}
      type={type}
      placeholder={label}
      className={`input-field ${multiline ? 'multiline' : ''}`}
      rows={rows}
    />
  </div>
);

export default Input;
