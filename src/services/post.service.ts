import axios from 'axios';
import { authHeader } from './auth-header';
import { API_URL } from '../utils/api';

console.log(API_URL);

export const getTimelinePosts = (page: number) => {
  return axios.get(API_URL + `/posts/timeline?page=${page}`, {
    headers: authHeader(),
  });
};

export const timelinePost = (postData: FormData) => {
  return axios.post(
    API_URL + '/posts/create_post',
    // { content, image }, // keeping this syntax as reminder of curly braces
    postData, // contains content (as string) and file
    { headers: authHeader() }
  );
};

export const getUserProfilePosts = (userID: string) => {
  return axios.get(API_URL + `/posts/profile/${userID}`, {
    headers: authHeader(),
  });
};

export const likePost = (postID: string) => {
  return axios.post(
    API_URL + '/posts/like_post',
    { postID: postID },
    { headers: authHeader() }
  );
};
