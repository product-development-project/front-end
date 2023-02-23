import React, { useState } from 'react'
import './style.css';

export default function FormSelect(props) {
  const [isFocused, setIsFocused] = useState(false);
  const {label, onChange, errorMessage, options, defaultOptionValue, defaultOptionText, ...inputProps} = props;

  const handleFocus = () => {
    setIsFocused(true);
  }

  return (
    <div className='formInput'>
        <label>{label}</label>
        <select
          {...inputProps}
          onChange={(e) => onChange(e)}
          onBlur={handleFocus}
          focused={isFocused.toString()}
        >
          {(defaultOptionValue || defaultOptionText) &&
            <option value={defaultOptionValue || ''}>{defaultOptionText || 'Please select an item'}</option>
          }
          {options.length > 0 && options.map((item, key) => {
            return (
                <option key={key} value={item.value}>{item.name}</option>
            )
          })}
        </select>
        <span>{errorMessage}</span>
    </div>
  )
}