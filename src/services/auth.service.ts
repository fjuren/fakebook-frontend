import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
      // console.log(response.status);
      if (response.data.token) {
        localStorage.setItem('token', JSON.stringify(response.data)); // recall this contains Bearer <token
      }
      return response;
    });
};

export const logout = () => {
  localStorage.removeItem('token');
  return axios.post(API_URL + '/logout');
  // .then((response) => {
  //   console.log(response.data.message);
  // });
};

export const getUser = () => {
  const userToken = localStorage.getItem('token');
  if (userToken) return JSON.parse(userToken);
};
