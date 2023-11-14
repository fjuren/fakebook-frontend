import { createContext, useState } from 'react';

export const TimelinePostCardContext = createContext();

export const TimelinePostCardProvider = ({
  children,
  minimalUserData,
}: any) => {
  const [comments, setComments] = useState([]);
  const [postLikes, setPostLikes] = useState([]);
  const [user, setUser] = useState(minimalUserData);

  return (
    <TimelinePostCardContext.Provider
      value={{ comments, setComments, postLikes, setPostLikes, user, setUser }}
    >
      {children}
    </TimelinePostCardContext.Provider>
  );
};
