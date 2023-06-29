/* eslint no-useless-escape: 0 */ // --> OFF (due to regex pattern warning)
import axios from 'axios';

// validate string is an acceptable email address
export const validateEmail = (email: string) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

export const validatePassword = (password: string) => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,100}$/;
  return re.test(password);
};

// convert ISO 8601 UTC timestamp to user's local timezone
export const getLocalTime = (timestamp: Date) => {
  // creates date object
  const date = new Date(timestamp);

  const userTimeOffset = new Date().getTimezoneOffset();

  date.setMinutes(date.getMinutes() - userTimeOffset);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  const localTime = date.toLocaleString('en-US', options);
  return localTime;
};
