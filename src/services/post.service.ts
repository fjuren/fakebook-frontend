import axios from 'axios';
import { authHeader } from './auth-header';

const API_URL = 'http://localhost:3000/api/posts';

export const getTimeline = () => {
  return axios.get(API_URL + '/timeline', { headers: authHeader() });
};

export const timelinePost = (postData: FormData) => {
  return axios.post(
    API_URL + '/create_post',
    // { content, image }, // keeping this syntax as reminder of curly braces
    postData, // contains content (as string) and file
    { headers: authHeader() }
  );
};
