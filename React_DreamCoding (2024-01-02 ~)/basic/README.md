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
  );
}
```

```js
// Profile.jsx
import React from "react";
import ProfilePicture from "./ProfilePicture";

export default function Profile({ image, name, title, isNew }) {
  return (
    <div className="profile">
      <ProfilePicture image={image} isnew={isnew} />

      <h1>{name}</h1>
      <p>{title}</p>
    </div>
  );
}
```

3. counter 두개의 count를 합한 total count를 만들고 total count가 10보다 크면 얼음 이모티콘이 불 이모티콘으로 변경

```js
// TotalCounter.jsx
import React from "react";

export default function TotalCounter({ totalCount }) {
  return (
    <div>
      Total Count: {totalCount} {totalCount > 10 ? "🔥" : "🧊"}
    </div>
  );
}
```

```js
// Counter.jsx
import React, { useState } from "react";

export default function Counter({ copyCount }) {
  const [count, setCount] = useState(0);
  return (
    <div className="counter">
      <span className="number">{count}</span>
      <button
        className="button"
        onClick={() => {
          setCount((prev) => {
            copyCount(prev + 1); // copyCounter는 count값을 외부로 전달해줌
            return prev + 1;
          });
        }}
      >
        Add
      </button>
    </div>
  );
}
```

```js
// AppCounter.jsx
import React, { useState } from "react";

export default function Counter({ copyCount }) {
  const [count, setCount] = useState(0);
  return (
    <div className="counter">
      <span className="number">{count}</span>
      <button
        className="button"
        onClick={() => {
          setCount((prev) => {
            copyCount(prev + 1);
            return prev + 1;
          });
        }}
      >
        Add
      </button>
    </div>
  );
}
```
4. 마우커서를 따라다니는 빨간원 만들기
```js
// AppXY.jsx
import React, { useState } from "react";
import "./AppXY.css";

export default function AppXY() {
  const [XY, setXY] = useState([]);
  const handleMouseMove = (e) => {
    setXY([e.clientX, e.clientY]);
  };
  return (
    <div className="container" onMouseMove={handleMouseMove}>
      <div className="pointer" style={{
        left:XY[0],
        top:XY[1],
      }}/>
    </div>
  );
}
```
5. 멘토의 이름과 타이틀을 입력받아 객체 바꾸기
```js
//AppMentor.jsx
import React, { useState } from "react";

export default function AppMentor(props) {
  const [person, setPerson] = useState({
    name: "엘리",
    title: "개발자",
    mentor: {
      name: "밥",
      title: "시니어개발자",
    },
  });
  return (
    <div>
      <h1>
        {person.name}는 {person.title}
      </h1>
      <p>
        {person.name}의 멘토는 {person.mentor.name} ({person.mentor.title})
      </p>
      <button
        onClick={() => {
          const name = prompt(`what's your mentor's name?`);
          setPerson((person) => {
            ...person,
            mentor: {
              ...person.mentor,
              name: name,
            },
          }); // 이전 상태의 person을 고치는 것이므로 (person) => ({위의 코드}) 이런식으로 쓰는 것이 더 올바름
        }}
      >
        멘토 이름 바꾸기
      </button>
      <button
        onClick={() => {
          const title = prompt(`what's your mentor's title?`);
          setPerson((person) => {
            ...person,
            mentor: {
              ...person.mentor,
              title: title,
            },
          });
        }}
      >
        멘토 타이틀 바꾸기
      </button>
    </div>
  );
}
```