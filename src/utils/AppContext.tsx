import { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppContextProvider = ({ children, minimalUserData }: any) => {
  const [comments, setComments] = useState([]);
  const [postLikes, setPostLikes] = useState([]);
  const [postLikeCount, setPostLikeCount] = useState([]);
  const [friendRequest, setFriendRequest] = useState([]);
  const [acceptFriendRequest, setAcceptFriendRequest] = useState([]);
  const [declineFriendRequest, setDeclineFriendRequest] = useState([]);
  const [unfriend, setUnfriend] = useState([]);
  const [user, setUser] = useState(minimalUserData);

  return (
    <AppContext.Provider
      value={{
        comments,
        setComments,
        postLikes,
        setPostLikes,
        postLikeCount,
        setPostLikeCount,
        friendRequest,
        setFriendRequest,
        acceptFriendRequest,
        setAcceptFriendRequest,
        declineFriendRequest,
        setDeclineFriendRequest,
        unfriend,
        setUnfriend,
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
