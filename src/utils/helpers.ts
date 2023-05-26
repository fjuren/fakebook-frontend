/* eslint no-useless-escape: 0 */ // --> OFF (due to regex pattern warning)

// validate string is an acceptable email address
export const validateEmail = (email: string) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

export const validatePassword = (password: string) => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,100}$/;
  return re.test(password);
};
