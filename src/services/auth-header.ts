// helper function for the http requests with protected routes

export const authHeader = () => {
  const userToken = localStorage.getItem('token');

  console.log(userToken);

  let user = null;
  if (userToken) user = JSON.parse(userToken);
  // if (userToken) user = userToken;

  if (user && user.accessToken) {
    return { 'x-access-token': user.accessToken };
  } else {
    return { 'x-access-token': null };
  }
};
