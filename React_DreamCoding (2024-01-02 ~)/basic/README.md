DreamCoding 리액트 강의 실습파일


스스로 해본 것

1. profile.jsx 프로필 사진 위에 태그를 생기게 하는 기능을 넣음

```js
// Profile.jsx
import React from "react";

export default function Profile({ image, name, title, isNew }) {
  return (
    <div className="profile">
      {isNew ? <h1 className="newtag">NEW</h1> : null}
      <img className="photo" src={image} alt="avatar" />

      <h1>{name}</h1>
      <p>{title}</p>
    </div>
  );
}
```
```css
/*App.css*/
.newtag {
  background-color: aquamarine;
  width: 80px;
  font-size: 20px;
  text-align: center;
  border-radius: 10px;
  position: absolute;
  margin-top: 1px;
  margin-left: 200px;
}
```
2. 프로파일의 사진 부분을 따로 빼와 컴포넌트로 만듬.
```js
// Avatar.jsx
export default function ProfilePicture() {
    return (
        <div>
            {isNew && <span className="new">New</span>}
            <img className="photo" src={image} alt="avatar" />
        </div>
    )
}
```
```js
// Profile.jsx
import React from "react";
import ProfilePicture from "./ProfilePicture";

export default function Profile({ image, name, title, isNew }) {
  return (
    <div className="profile">
        
      <ProfilePicture image={image} isnew={isnew}/>

      <h1>{name}</h1>
      <p>{title}</p>
    </div>
  );
}
```
