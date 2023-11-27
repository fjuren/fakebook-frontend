import { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppContextProvider = ({ children, minimalUserData }: any) => {
  const [comments, setComments] = useState([]);
  const [postLikes, setPostLikes] = useState([]);
  const [friendRequest, setFriendRequest] = useState([]);
  const [acceptFriendRequest, setAcceptFriendRequest] = useState([]);
  const [declineFriendRequest, setDeclineFriendRequest] = useState([]);
  const [user, setUser] = useState(minimalUserData);

  return (
    <AppContext.Provider
      value={{
        comments,
        setComments,
        postLikes,
        setPostLikes,
        friendRequest,
        setFriendRequest,
        acceptFriendRequest,
        setAcceptFriendRequest,
        declineFriendRequest,
        setDeclineFriendRequest,
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
