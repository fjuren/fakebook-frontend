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

// --- Next 4 functions are date helpers ---

// helper to use when comparing dates
const getDayMonthYear = (timestamp: Date) => {
  const day = timestamp.getDate();
  const month = timestamp.toLocaleString('default', { month: 'long' });
  const year = timestamp.getFullYear();

  return `${day} ${month} ${year}`;
};

// used to convert UTC date to a locale date
const getLocalDate = (timestamp: Date) => {
  const date = new Date(timestamp);

  const userTimeOffset = new Date().getTimezoneOffset();

  date.setMinutes(date.getMinutes() - userTimeOffset);

  return date;
};

// display a converted ISO 8601 UTC timestamp to user's local timezone
export const displayLocalDate = (timestamp: Date, options: object) => {
  const date = new Date(timestamp);

  return date.toLocaleString('en-US', options);
};

// Checks a timestamp against the current date and returns specific formatting for user
export const conditionalDateDisplay = (timestamp: Date) => {
  // get current date in local time and convert it to a formatted string for conditional statement
  const currentDate = getDayMonthYear(new Date());

  // get timestamp of post, convert it to local time and and convert it to a formatted string for conditional statement
  const timeStampDate = getDayMonthYear(getLocalDate(timestamp));

  // show time only if the current date is the same as the posted date
  if (timeStampDate === currentDate) {
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };

    return displayLocalDate(timestamp, options);
  } else {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    return displayLocalDate(timestamp, options);
  }
};
