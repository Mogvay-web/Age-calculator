import { useState } from 'react';
import './AgeCalculator.css';
import Input from './Input';

function AgeCalculator() {
  const [error, setError] = useState({}),
    [age, setAge] = useState({
      years: '- -',
      months: '- -',
      days: '- -',
    });

  function nonExistentDay(inputs) {
    let day = inputs[0].value,
      month = inputs[1].value,
      year = inputs[2].value;

    if (day === '' || month === '' || year === '') {
      return false;
    }

    let daysInMonth = {
      1: 31,
      2: 28,
      3: 31,
      4: 30,
      5: 31,
      6: 30,
      7: 31,
      8: 31,
      9: 30,
      10: 31,
      11: 30,
      12: 31,
    };

    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      daysInMonth[2] = 29;
    }

    return daysInMonth[month] < day;
  }

  function futureDate(inputs) {
    let day = inputs[0].value,
      month = inputs[1].value,
      year = inputs[2].value;

    const message = 'Must be in the past',
      currentYear = new Date().getFullYear(),
      currentMonth = new Date().getMonth() + 1,
      currentDay = new Date().getDate();

    if (year > currentYear) return 'year:' + message;
    if (year == currentYear && month > currentMonth) return 'month:' + message;
    if (year == currentYear && month == currentMonth && day >= currentDay)
      return 'day:' + message;

    return false;
  }

  function validation(e) {
    let inputs = e.target.getElementsByClassName('age-calculator__input'),
      invalidDay = nonExistentDay(inputs);

    let updatedError = { ...error },
      values = {};

    for (let input of inputs) {
      let id = input.getAttribute('id'),
        value = input.value,
        flag = false;

      values[id] = value;

      switch (id) {
        case 'day':
          if (value < 1 || value > 31 || invalidDay) {
            flag = true;
          }
          break;
        case 'month':
          if (value < 1 || value > 12) {
            flag = true;
          }
          break;
        case 'year':
          if (value < 1900) {
            flag = true;
          }
          break;
        default:
          break;
      }

      if (value === '' || flag) {
        updatedError[id] = 'Must be a valid ' + id;
      } else {
        delete updatedError[id];
      }
    }

    if (Object.keys(updatedError).length === 0) {
      let futureDateError = futureDate(inputs);
      if (!futureDateError) {
        calculation(values);
      } else {
        let arrError = futureDateError.split(':');

        updatedError[arrError[0]] = arrError[1];
      }
    }
    setError(updatedError);
  }

  function send(e) {
    e.preventDefault();
    validation(e);
  }

  function calculation(values) {
    const now = new Date(),
      birthday = new Date(`${values.year}.${values.month}.${values.day}`);

    let years, months, days;

    months = (now.getFullYear() - birthday.getFullYear()) * 12;
    months -= birthday.getMonth();
    months += now.getMonth();

    let tempDate = new Date(birthday);

    tempDate.setMonth(tempDate.getMonth() + months);

    days = Math.abs(Math.floor((now - tempDate) / (1000 * 60 * 60 * 24)));
    years = Math.floor(months / 12);
    months %= 12;

    const updatedAge = { ...age };

    updatedAge.years = years;
    updatedAge.months = months;
    updatedAge.days = days;

    setAge(updatedAge);
  }

  return (
    <form className="age-calculator" onSubmit={send}>
      <div className="age-calculator__block age-calculator__block--inputs">
        <Input id="day" placeholder="DD" error={error} maxLength={2} />
        <Input id="month" placeholder="MM" error={error} maxLength={2} />
        <Input id="year" placeholder="YYYY" error={error} maxLength={4} />
      </div>
      <div className="age-calculator__block age-calculator__block--send">
        <hr className="age-calculator__line"></hr>
        <button className="age-calculator__button">
          <svg
            className="age-calculator__button-image"
            xmlns="http://www.w3.org/2000/svg"
            width="46"
            height="44"
            viewBox="0 0 46 44"
          >
            <g fill="none" stroke="#FFF" strokeWidth="2">
              <path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44" />
            </g>
          </svg>
        </button>
        <hr className="age-calculator__line age-calculator__line_hidden"></hr>
      </div>
      <div className="age-calculator__block age-calculator__block--age">
        <div className="age-calculator__age-wrapper">
          <span className="age-calculator__age-value">{age.years}</span>
          <span className="age-calculator__age-unit">years</span>
        </div>
        <div className="age-calculator__age-wrapper">
          <span className="age-calculator__age-value">{age.months}</span>
          <span className="age-calculator__age-unit">months</span>
        </div>
        <div className="age-calculator__age-wrapper">
          <span className="age-calculator__age-value">{age.days}</span>
          <span className="age-calculator__age-unit">days</span>
        </div>
      </div>
    </form>
  );
}

export default AgeCalculator;
