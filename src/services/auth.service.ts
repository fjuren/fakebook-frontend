import axios from 'axios';

const API_URL = 'http://localhost:3000/api/users';

export const signup = (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  return axios
    .post(API_URL + '/signup', {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem('token', JSON.stringify(response.data)); // TODO REMOVE PASSWORD FROM RESPONSE
        // const token = response.data.token; // recall this gives Bearer <token id>
        // localStorage.setItem('token', token);
      }
      return response;
    });
};

export const login = (email: string, password: string) => {
  return axios
    .post(API_URL + '/login', {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem('token', JSON.stringify(response.data));
        // const token = response.data.token; // recall this gives Bearer <token id>
        // localStorage.setItem('token', token);
      }
      return response.data;
    });
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const getUser = () => {
  const userToken = localStorage.getItem('token');
  if (userToken) return JSON.parse(userToken);
};
