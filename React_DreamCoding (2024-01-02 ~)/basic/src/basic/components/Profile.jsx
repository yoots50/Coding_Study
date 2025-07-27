import React from "react";
import ProfilePicture from "./Avatar";

export default function Profile({ image, name, title, isNew }) {
  return (
    <div className="profile">
        
      <ProfilePicture image={image} isNew={isNew}/>

      <h1>{name}</h1>
      <p>{title}</p>
    </div>
  );
}
