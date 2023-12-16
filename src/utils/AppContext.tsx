import { createContext, useState } from 'react';

interface AppContextValues {
  friendRequest: any[];
  acceptFriendRequest: any[];
  declineFriendRequest: any[];
  unfriend: any[];
  profilePic: string;
  user: any;
  setFriendRequest: React.Dispatch<React.SetStateAction<any[]>>;
  setAcceptFriendRequest: React.Dispatch<React.SetStateAction<any[]>>;
  setDeclineFriendRequest: React.Dispatch<React.SetStateAction<any[]>>;
  setUnfriend: React.Dispatch<React.SetStateAction<any[]>>;
  setProfilePic: React.Dispatch<React.SetStateAction<string>>;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

interface PostLikesContextValues {
  postLikes: any[];
  setPostLikes: React.Dispatch<React.SetStateAction<any[]>>;
}

interface PostCommentsContextValues {
  comments: any[];
  setComments: React.Dispatch<React.SetStateAction<any[]>>;
}

export const AppContext = createContext<AppContextValues | undefined>(
  undefined
);
export const PostLikesContext = createContext<
  PostLikesContextValues | undefined
>(undefined);
export const PostCommentsContext = createContext<
  PostCommentsContextValues | undefined
>(undefined);

export const AppContextProvider = ({ children, minimalUserData }: any) => {
  // const [comments, setComments] = useState([]);
  const [friendRequest, setFriendRequest] = useState<any[]>([]);
  const [acceptFriendRequest, setAcceptFriendRequest] = useState<any[]>([]);
  const [declineFriendRequest, setDeclineFriendRequest] = useState<any[]>([]);
  const [unfriend, setUnfriend] = useState<any[]>([]);
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
