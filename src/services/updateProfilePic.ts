import axios from 'axios';
import { authHeader } from './auth-header';
import { API_URL } from './user.service';

// update profile pic on profile page

export const updateProfilePic = (
  profileImage: FormData,
  authedUserID: string
) => {
  return axios
    .post(API_URL + `/update_profile_pic/${authedUserID}`, profileImage, {
      headers: authHeader(),
    })
    .then((response) => {
      const storedLocalData = JSON.parse(localStorage.getItem('token')!);
      if (storedLocalData) {
        storedLocalData.avatar = response.data.avatar;
      }
      localStorage.setItem('token', JSON.stringify(storedLocalData));
    });
};
