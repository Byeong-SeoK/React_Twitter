import React from "react";
import { signOut } from "firebase/auth";
import { authService } from "myBase";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  //useNavigate 훅을 이용하여 redirect를 하도록 만든다.

  const onLogOutClick = () => {
    signOut(authService);
    navigate("/");
    //navigate("/") 덕분에 로그아웃 되자마자 /로 redirect된다.
  };

  return (
    <>
      <span>Profile</span>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
