import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import { authService } from "fbase";


function App() {
  const [init, SetInit] = useState(false);
  const [userObj, SetUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user){
        //add
        if(user.displayName === null){
          // user.updateProfile({
          //   displayName: "Nwitter",
          // })
          const ind = user.email.indexOf ("@");
          const end = user.email.substring (0, ind);
          user.updateProfile ({displayName: end.toString()});
        }//
        SetUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        SetUserObj(null);
      }
      SetInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    SetUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  }
  return (
    <>
  {init ? <AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj}/> : "Initializing..."}
  <footer>&copy; {new Date().getUTCFullYear()} Nwitter</footer>
  </>
  );
}

export default App;
