import React, { useState } from 'react';

const SelectType = ({ type, setType }) => {
  const [options, setOptions] = useState([
    { title: 'Invoice' },
    { title: 'Receipt' },
    { title: 'Estimate' },
    { title: 'Quotation' },
    { title: 'Bill' },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setType(option.title);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Select Type"
        value={inputValue}
        onChange={handleInputChange}
      />
      <ul>
        {options.map((option) => (
          <li key={option.title} onClick={() => handleOptionSelect(option)}>
            {option.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectType;
