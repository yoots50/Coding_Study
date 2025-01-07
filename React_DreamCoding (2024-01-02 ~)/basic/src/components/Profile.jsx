import React from "react";

export default function Profile({ image, name, title, isNew }) {
  return (
    <div className="profile">
        {isNew && <span className="new">New</span>}
      <img className="photo" src={image} alt="avatar" />

      <h1>{name}</h1>
      <p>{title}</p>
    </div>
  );
}
