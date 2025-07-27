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
6. 멘토의 이름을 다른 이름으로 바꾸기
```js
//AppMentors.jsx
import React, { useState } from "react";

export default function AppMentors() {
  const [person, setPerson] = useState({
    name: "엘리",
    title: "개발자",
    mentors: [
      {
        name: "밥",
        title: "시니어개발자",
      },
      {
        name: "제임스",
        title: "시니어개발자",
      },
    ],
  });
  return (
    <div>
      <h1>
        {person.name}는 {person.title}
      </h1>
      <p>{person.name}의 멘토는:</p>
      <ul>
        {person.mentors.map((mentor, index) => (
          <li key={index}>
            {mentor.name} ({mentor.title})
          </li>
        ))}
      </ul>
      <button
        onClick={() => {
          const prev = prompt(`누구의 이름을 바꾸고 싶은가요?`);
          const current = prompt(`이름을 무엇으로 바꾸고 싶은가요?`);
          {
            person.mentors.map((mentor, index) => {
              if (mentor.name === prev) {
                setPerson((prevPerson) => {
                  prevPerson.mentors[index].name = current; // 이는 틀린 표현임, 객체는 객체마다 레퍼런스를 가지고 있으며, 리엑트에선 새로운 참조값이 만들어져야 업데이트를 함, 이를 바꾸어 새로운 객체를 만들게끔 하여 새로운 레퍼런스를 가지게끔 해야함
                });
              }
            });
          }
        }}
      >
        멘토의 이름을 바꾸기
      </button>
    </div>
  );
}
```
7. 멘토를 추가/삭제하는 버튼 만들기
```js
import React, { useState } from "react";

export default function AppMentors() {
  const [person, setPerson] = useState({
    name: "엘리",
    title: "개발자",
    mentors: [
      {
        name: "밥",
        title: "시니어개발자",
      },
      {
        name: "제임스",
        title: "시니어개발자",
      },
    ],
  });
  return (
    <div>
      <h1>
        {person.name}는 {person.title}
      </h1>
      <p>{person.name}의 멘토는:</p>
      <ul>
        {person.mentors.map((mentor, index) => (
          <li key={index}>
            {mentor.name} ({mentor.title})
          </li>
        ))}
      </ul>
      <button
        onClick={() => {
          const prev = prompt(`누구의 이름을 바꾸고 싶은가요?`);
          const current = prompt(`이름을 무엇으로 바꾸고 싶은가요?`);
          setPerson((prevPerson) => ({
            ...prevPerson,
            mentors: prevPerson.mentors.map((mentor) => { 
              if (mentor.name === prev) {
                return {
                  ...mentor,
                  name: current,
                };
              }
              return mentor;
            }),
          }));
        }}
      >
        멘토의 이름을 바꾸기
      </button>
      <button
        onClick={() => {
          const newName = prompt(`추가할 이름을 입력하세요.`);
          const newTitle = prompt(`직업을 입력하세요.`);
          setPerson((prevPerson) => ({ // 스프레드 연산자를 쓰면 더 간단하게 코드를 짤 수 있음 ex) mentors: [...prevPerson.mentors, {newName, newTitle}]
            ...prevPerson,
            mentors: [
              ...prevPerson.mentors,
              {
                name: newName,
                title: newTitle,
              },
            ],
          }));
        }}
      >
        멘토 추가하기
      </button>
      <button
        onClick={() => {
          const deleteName = prompt(`삭제할 사람의 이름을 입력하세요.`);
          setPerson((prevPerson) => ({
            ...prevPerson,
            mentors: prevPerson.mentors.map((mentor, index) => { // 삭제할 땐 filter를 이용하는 것이 코드가 더 깔끔함 ex) mentors: prevPerson.mentors.filter((mentor) => mentor.name !=== deleteName)
              if (mentor.name === deleteName) {
                delete prevPerson.mentors[index];
                return;
              } else {
                return mentor;
              }
            }),
          }));
        }}
      >
        멘토 삭제하기
      </button>
    </div>
  );
}
```