import { authService, /*dbService */ } from 'fbase';
import React/*, { useEffect }*/ from 'react';
import { useHistory } from 'react-router-dom';
import { useState } from 'react/cjs/react.development';

export default function Profile({refreshUser, userObj }) {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };
    
    // const getMyNweets = async () => {
    //       const nweets = await dbService
    //         .collection("nweets")
    //         .where("creatorId", "==", userObj.uid)
    //         .orderBy("createdAt")
    //         .get();
    //       console.log(nweets.docs.map((doc) => doc.data()));
    //       console.log(userObj.displayName);
    // };
    // useEffect(() => {
    //   getMyNweets();
    // }, []); 
    const onChange = (event) => {
      const {
        target: { value },
      } = event;
      setNewDisplayName(value);
    };
    const onSubmit = async (event) => {
      event.preventDefault();
      if (userObj.displayName !== newDisplayName) {
        await userObj.updateProfile({
          displayName: newDisplayName,
        });
        refreshUser();
      }
    };
    return (
      <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input onChange={onChange} type="text" placeholder="Display Name" value={newDisplayName} autoFocus className="formInput"/>
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }} />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
    );
  };