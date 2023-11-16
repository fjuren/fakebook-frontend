import axios from 'axios';
import { authHeader } from './auth-header';

const API_URL = 'http://localhost:3000/api/posts';

export const getTimelinePosts = () => {
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

export const getUserProfilePosts = (userID: string) => {
  return axios.get(API_URL + `/profile/${userID}`, { headers: authHeader() });
};

export const likePost = (postID: string) => {
  return axios.post(
    API_URL + '/like_post',
    { postID: postID },
    { headers: authHeader() }
  );
};
