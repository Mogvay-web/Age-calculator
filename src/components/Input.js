import { useState } from 'react';
import './Input.css';

function Input({ id, placeholder, error, maxLength }) {
  const [value, setValue] = useState('');

  function maxLengthCheck(event, maxLength) {
    let value = event.target.value,
      length = value.length;

    if (length > maxLength) {
      value = value.slice(0, maxLength);
    }

    setValue(value);
  }

  let errorText = error === null ? '' : error[id];

  return (
    <div className="age-calculator__field">
      <label
        className={
          'age-calculator__label' +
          `${errorText ? ' age-calculator__label_error' : ''}`
        }
        htmlFor={id}
      >
        {id}
      </label>
      <input
        className={
          'age-calculator__input' +
          `${errorText ? ' age-calculator__input_error' : ''}`
        }
        id={id}
        type="number"
        value={value}
        placeholder={placeholder}
        onInput={(event) => maxLengthCheck(event, maxLength)}
      />
      {errorText && <span className="age-calculator__error">{errorText}</span>}
    </div>
  );
}

export default Input;
