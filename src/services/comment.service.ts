import axios from 'axios';
import { authHeader } from './auth-header';
import { API_URL } from '../utils/api';

export const postComment = (comment: string, postID: string) => {
  return axios.post(
    API_URL + '/comments/create_comment',
    { content: comment, postID: postID },
    {
      headers: authHeader(),
    }
  );
};
