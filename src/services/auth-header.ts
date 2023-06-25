// helper function for the http requests with protected routes

export const authHeader = () => {
  const userToken = localStorage.getItem('token');

  let user = null;
  if (userToken) user = JSON.parse(userToken);

  if (user && user.token) {
    return { Authorization: user.token };
  } else {
    return {};
  }
};
