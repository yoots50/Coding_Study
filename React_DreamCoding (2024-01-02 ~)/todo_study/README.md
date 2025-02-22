# 강의 보고 Todo 리스트 만들어보기

## 직접 해본것

- 리스트를 만들고 체크박스를 넣음으로써 todo 리스트의 기본적인 틀을 만듬

```js
export default function TodoList() {
  return (
    <div>
      <ul>
        <li>
          장보기 <input type="checkbox"></input>
        </li>
        <li>
          공부하기<input type="checkbox"></input>
        </li>
      </ul>
    </div>
  );
}
```
