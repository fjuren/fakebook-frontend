import axios from 'axios';
import { authHeader } from './auth-header';

const API_URL = 'http://localhost:3000/api/comments';

export const postComment = (comment: string, postID: string) => {
  return axios.post(
    API_URL + '/create_comment',
    { content: comment, postID: postID },
    {
      headers: authHeader(),
    }
  );
};
