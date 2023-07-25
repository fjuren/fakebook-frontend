import React, { useState, useEffect } from 'react';
import FacebookLogin from '@greatsumini/react-facebook-login';
import { configVars } from '../services/auth.service';

export default function FacebookLoginBtn() {
  const [fbClientID, setFbClientID] = useState('');

  // useEffect(() => {
  const fetchfbClientID = () => {
    configVars()
      .then((response) => {
        const { data } = response.data;

        setFbClientID(data);
      })
      .catch((err) => {
        throw err;
      });
  };
  //   fetchfbClientID();
  // }, []);

  return (
    <>
      <FacebookLogin
        appId={fbClientID} // TODO
        onSuccess={(response) => {
          console.log('Login Success!', response);
        }}
        onFail={(error) => {
          console.log('Login Failed!', error);
        }}
        onProfileSuccess={(response) => {
          console.log('Get Profile Success!', response);
        }}
        // render={({ fetchfbClientID }) => {
        //   <button onClick={fetchfbClientID} />
        // }}
        // style={{
        //   backgroundColor: '#4267b2',
        //   color: '#fff',
        //   fontSize: '16px',
        //   padding: '12px 24px',
        //   border: 'none',
        //   borderRadius: '4px',
        // }}
      />
    </>
  );
}
