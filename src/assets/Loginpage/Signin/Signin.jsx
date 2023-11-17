import React from 'react';
import Header from '../../../FirstPage/Header/Header';
import Body from '../../../FirstPage/Body/Body';
import './Signin.css';

const Signin = ({ username, userUid }) => {


  return (
    <div className='lead'>
      <Header username={username} userUid={userUid}/>
      <Body userUid={userUid} />
    </div>
  );
};

export default Signin;


