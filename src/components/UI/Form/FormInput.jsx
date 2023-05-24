import React, { useState } from 'react'
import './style.css';

export default function FormInput(props) {
  const [isFocused, setIsFocused] = useState(false);
  const { label, onChange, errorMessage, ...inputProps } = props;

  const handleFocus = () => {
    setIsFocused(true);
  }

  return (
    <div className='formInput'>
      <label>{label}</label>
      <input
        {...inputProps}
        onChange={(e) => onChange(e)}
        onBlur={handleFocus}
        focused={isFocused.toString()} />
      <span>{errorMessage}</span>
    </div>
  )
}