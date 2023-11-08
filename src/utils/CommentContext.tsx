import { createContext, useState } from 'react';

export const CommentContext = createContext();

export const CommentProvider = ({ children, minimalUserData }: any) => {
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState(minimalUserData);

  return (
    <CommentContext.Provider value={{ comments, setComments, user, setUser }}>
      {children}
    </CommentContext.Provider>
  );
};
