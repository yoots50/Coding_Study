# 📖 Typescript for beginners

노마드 코더(NomadCoders)의 강의 (https://nomadcoders.co/typescript-for-beginners) 기반으로 Typescript를 배움

## #1.1 ~ #1.5
- Typescript는 강타입 언어로 JS와 같이 타입 안정성이 없는 언어에 비해 타입 안정성이 강하므로 생산성이 높고 버그 발생률도 현저히 낮다.
## #2.0 ~ #2.4
- Typescript는 코드를 작성 할 경우 작성된 코드가 JS 코드로 컴파일되며 컴파일되기 전에 코드를 검사하여 에러가 발생할 것 같은 코드를 발견하면 컴파일되지 않는다.
- C나 C++에서는 변수를 생성할 때 int a; 와 같은 식으로 타입을 명시하며 (Explicit Types), JS에서는 변수를 생성할 때 타입을 할당하지 않고 암묵적으로 할당함으로써 컴파일러가 추론하게 한다 (Implicit Types). Typescript에서는 이 두가지 방식으로 타입을 설정할 수 있으며 암묵적 타입이 더 많이 쓰이는데 이는 코드 작성 시간을 최소화 하기 위함이다.
- Typescript는 다음과 같이 타입을 지정할 수 있다.
1. Object를 만들 때 선택적 변수를 지정하는 것이 가능하다.
```
type Player = {
    name:string,
    age?:number
}
```
2. Type를 직접 만들 수 있다.
```
type Name = string
```
3. Object의 type를 다음과 같이 정의한다.
```
const Player : {
    name:string,
    age?:number
} = {
    name:"nico"
}

또는 

cosnt Player : Player = {
    name:"nico"
}
```
4. 데이터를 수정하지 못 하도록 readonly 타입을 지정할 수 있다.
```
type Player = {
    readonly name:Name,
    age?:Age
}
```
5. 다양한 타입의 변수들을 가진 array를 지정할 땐 다음과 같이 한다.
```
cosnt player: [string, number, boolean] = ["nico", 1, true]
```
6. undefined, null이라는 타입이 존재한다.
```
let a : undefined = undefined
let b : null = null
```
7. any라는 타입이 존재한다. any는 Typescript의 타입 시스템을 벗어나는 타입이다.
```
let a = []
```
8. unknown이라는 타입이 존재한다.
```

```
## #3.0 ~ #3.4

## #4.0 ~ #4.5

## #5.0 ~ #5.8