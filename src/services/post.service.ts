import axios from 'axios';
import { authHeader } from './auth-header';

const API_URL = 'http://localhost:3000/api/posts';

export const getTimeline = () => {
  return axios.get(API_URL + '/timeline'), { headers: authHeader() };
};
