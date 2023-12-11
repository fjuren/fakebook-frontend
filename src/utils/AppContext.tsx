import { createContext, useState, useContext } from 'react';

export const AppContext = createContext();
export const PostLikesContext = createContext();
export const PostCommentsContext = createContext();

export const AppContextProvider = ({ children, minimalUserData }: any) => {
  // const [comments, setComments] = useState([]);
  const [friendRequest, setFriendRequest] = useState([]);
  const [acceptFriendRequest, setAcceptFriendRequest] = useState([]);
  const [declineFriendRequest, setDeclineFriendRequest] = useState([]);
  const [unfriend, setUnfriend] = useState([]);
  const [profilePic, setProfilePic] = useState('');
  const [user, setUser] = useState(minimalUserData);

  return (
    <AppContext.Provider
      value={{
        // comments,
        // setComments,
        friendRequest,
        setFriendRequest,
        acceptFriendRequest,
        setAcceptFriendRequest,
        declineFriendRequest,
        setDeclineFriendRequest,
        unfriend,
        setUnfriend,
        profilePic,
        setProfilePic,
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const PostLikesContextProvider = ({ children, initialLikes }: any) => {
  const [postLikes, setPostLikes] = useState(initialLikes || []);
  return (
    <PostLikesContext.Provider value={{ postLikes, setPostLikes }}>
      {children}
    </PostLikesContext.Provider>
  );
};

export const PostCommentsContextProvider = ({
  children,
  initialComments,
}: any) => {
  const [comments, setComments] = useState(initialComments || []);
  return (
    <PostCommentsContext.Provider value={{ comments, setComments }}>
      {children}
    </PostCommentsContext.Provider>
  );
};
