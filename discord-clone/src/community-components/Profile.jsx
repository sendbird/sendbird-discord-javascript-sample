import React from "react";
import "./profile.scss";

export default function Profile({ user }) {

  if(!user.plainProfileUrl){
    user.plainProfileUrl = 'https://yt3.ggpht.com/ytc/AKedOLQc1OCf9gztVmcVnmI_41uN9axrRP8wd4a-GflFRQ=s900-c-k-c0x00ffffff-no-rj'
  }

  return (
    <div className="profile-component">
      <div className="profile-avatar">
        <img src={user.plainProfileUrl} alt={user.nickname} />
      </div>
      <div className="profile-text">
        <div className="profile-name">{user.nickname}</div>
        <div className="profile-nickname">#{user.userId}</div>
      </div>
    </div>
  );
}