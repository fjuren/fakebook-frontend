import axios from 'axios';
import { authHeader } from './auth-header';

const API_URL = 'http://localhost:3000/api/users';

export const getUserProfile = (userID: string) => {
  return axios.get(API_URL + `/profile/${userID}`, {
    headers: authHeader(),
  });
};

// Sends a friend request, from authedUser to user
export const postFriendRequest = (userID: string, authedUserID: string) => {
  return axios.post(
    API_URL + `/friend_request/${userID}`,
    { userID: userID, authedUserID: authedUserID },
    {
      headers: authHeader(),
    }
  );
};

// Gets the friend requests
export const getAllFriendRequests = (
  userOrAuthUserID: string,
  authedUserID: string
) => {
  return axios.get(
    API_URL + `/friends/`,
    // { userOrAuthUserID: userOrAuthUserID, authedUserID: authedUserID },
    {
      headers: authHeader(),
      params: {
        userOrAuthUserID: userOrAuthUserID,
        authedUserID: authedUserID,
      },
    }
  );
};

// for when I add role profiles to the backend

// export const getUserBoard = () => {
//     return axios.get(API_URL + "user", { headers: authHeader() });
//   };

//   export const getModeratorBoard = () => {
//     return axios.get(API_URL + "mod", { headers: authHeader() });
//   };

//   export const getAdminBoard = () => {
//     return axios.get(API_URL + "admin", { headers: authHeader() });
//   };
