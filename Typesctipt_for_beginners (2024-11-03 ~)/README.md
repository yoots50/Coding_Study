# 📖 Typescript for beginners

노마드 코더(NomadCoders)의 강의 (https://nomadcoders.co/typescript-for-beginners) 기반으로 Typescript를 배움

📖 < 표시 된 것은 직접 만든 코드 챌린지임

## #1.1 ~ #1.5

- Typescript는 강타입 언어로 JS와 같이 타입 안정성이 없는 언어에 비해 타입 안정성이 강하므로 생산성이 높고 버그 발생률도 현저히 낮다.

## #2.0 ~ #2.4

- Typescript는 코드를 작성 할 경우 작성된 코드가 JS 코드로 컴파일되며 컴파일되기 전에 코드를 검사하여 에러가 발생할 것 같은 코드를 발견하면 컴파일되지 않는다.
- C나 C++에서는 변수를 생성할 때 int a; 와 같은 식으로 타입을 명시하며 (Explicit Types), JS에서는 변수를 생성할 때 타입을 할당하지 않고 암묵적으로 할당함으로써 컴파일러가 추론하게 한다 (Implicit Types). Typescript에서는 이 두가지 방식으로 타입을 설정할 수 있으며 암묵적 타입이 더 많이 쓰이는데 이는 코드 작성 시간을 최소화 하기 위함이다.
- Typescript는 다음과 같이 타입을 지정할 수 있다.

1. Object를 만들 때 선택적 변수를 지정하는 것이 가능하다.

```TS
type Player = {
    name:string,
    age?:number
}
```

2. Type를 직접 만들 수 있다.

```TS
type Name = string
```

3. Object의 type를 다음과 같이 정의한다.

```TS
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

```TS
type Player = {
    readonly name:Name,
    age?:Age
}
```

5. 다양한 타입의 변수들을 가진 array를 지정할 땐 다음과 같이 한다.

```TS
cosnt player: [string, number, boolean] = ["nico", 1, true]
```

6. undefined, null이라는 타입이 존재한다.

```TS
let a : undefined = undefined
let b : null = null
```

7. any라는 타입이 존재한다. any는 Typescript의 타입 시스템을 벗어나는 타입이다.

```TS
let a = []
```

8. unknown이라는 타입이 존재한다. API로 부터 받은 변수의 타입을 모르는 상황 등에 사용한다. 이때, 타입을 모르기때문에 typeof를 써주어야 한다.

```TS
let a:unknown;

if (typeof a === "number") {
    let b = a + 1;
}
if (typeof a === "string") {
    a.toUpperCase();
}
```

9. void라는 타입이 존재한다. 이는 함수에만 적용되는 타입이며 함수가 아무런 반환값을 가지지 않을 때 void타입으로 인식된다.

```TS
function hello() {
    console.log('x');
}
```

10. never라는 타입이 존재한다. 함수가 에러를 발생시키고 반환값을 가지지 않을 때, 또는 어떤 변수가 어느 타입도 아닐 때 사용된다.

```TS
funtion hello():never {
    throw new Error("xxx")
}
funtion hello(name:string|number) {
    if (typeof name === "string") {
        name
    } else if (typeof name === "number") {
        name
    } else {
        name // 이변수는 자동적으로 never라는 타입을 가짐
    }
}
```
## #3.0 ~ #3.4

- call signature: 코드 위에 마우스 커서를 올리면 나오는 것, call signature의 타입을 만들때에는 다움과같이 한다.
call signature을 사용함으로써 함수가 어떻게 작동하는지 서술할 수 있다.

```TS
type Add = (a:number, b:number) => number;

const add:Add = (a, b) => a + b; // call signature 적용
```

- overloading: 함수가 여러개의 call signature를 가질 때 발생됨
```TS
type Add = {
    (a:number, b:number) : number;
    (a:number, b:string) : number;
}

const add: Add = (a, b) => {
    if (typeof b === "string") return a;
    return a + b;

}
```
- 서로 다른 call signature의 parameter 개수가 다르면 나머지 parameter는 직접 타입을 지정해야 함
``` TS
const Add = {
    (a: number)
}
```

- Polymorphism: 다형성은 함수가 다른 여러가지 모양을 가지거나 overloading같이 여러개 파라미터를 가져올 수 있는 것들을 말한다.
- concrete type: number, boolean, string과 같은 전형적인 타입
- generic: 타입의 placeholder와 같은 개념, 어떤 타입을 지정해 줄 필요 없이 타입스크립트가 이를 알게함
```TS
type SuperPrint = {
    <T>(arr: T[]): T // any를 써도 에러는 나지 않지만 타입을 잃어버리기에 쓰지않는 것이 좋음
}

const superPrint: SuperPrint = (arr) => arr[0];

const a = superPrint([1, 2, 3, 4]); // 자동으로 타입이 정해짐
const b = superPrint(["1", "2", "3", "4"]);
const c = superPrint([true, false, true, false]);
const d = superPrint([1, true, "1"]);
``` 

- generic은 타입을 생성, 확장, 코드를 저장할 수 있음
```TS
type Player<E> = {
    name:string
    extraInfo:E 
}

type NicoExtra = {
    favFood:string
}
type NicoPlayer = Player<NicoExtra>

const nico: NicoPlayer = {
    name:"nico",
    extraInfo: {
        favFood:"kimchi"
    }
}
```
## #4.0 ~ #4.5
- 타입스크립트에는 private, protected, public 이라는 키워드가 존재하며 이는 프로퍼티 또는 메소드에 접근을 어느정도 허락할지를 결정한다.
- private: 선언한 클래스 내에서 접근가능
- protected: private의 접근범위 + 상속받은 클래스 내에서 접근가능
- public: protected의 접근범위 + 인스턴스 내에서 접근가능
```TS
class Player { //  추상 클래스(abstract class): 다른 클래스가 상속받을 수 있는 클래스, 직접 새로운 인스턴스를 만들 수 없음
    constructor (
        private firstName:string,
        private lastName:string,
        public nickName: string,

    ) {}

const nico = new Player("nico", "las", "니꼬");

nico.firstName // 이부분은 private이므로 에러가 뜸
```
- 추상 클래스(abstract class): 다른 클래스가 상속받을 수 있는 클래스, 직접 새로운 인스턴스를 만들 수 없다, 추상 클래스에는 추상 메소드를 만들 수 있으며 추상 메소드는 상속받는 클래스에서 구현되어야만 한다.
```TS
abstract class User { // 추상 클래스
    constructor (
        protected firstName:string,
        protected lastName:string,
        protected nickName: string,

    ) {}
    abstract getNickName():void // 추상 메소드
    getFullName() { 
        return `${this.firstName} ${this.lastName}`
    }
}

class Player extends User { // Player가 User를 상속함, 상속 클래스
    getNickName() {
        console.log(this.nickName) // nickName이 private일 땐 에러발생
    }
}

const nico = new Player("nico", "las", "니꼬");

nico.getFullName()
nico.firstName() // firstName이 protected로 보호를 받으므로 에러발생
```
- 📖 Dict 클래스에서 단어를 삭제, 업데이트 하는 메소드 추가, Word 클래스에서 단어를 추가 또는 수정, 단어를 출력하는 메소드 추가
- 타입의 용도
1. 타입을 어떠한 변수에 지정
2. 타입의 별명(alias)을 지정
3. 특정한 값만을 가지도록 제한
```ts
type Team = "red" | "blue" | "yellow" // 특정한 값만을 가지도록 설정
type Health = 1 | 5 | 10
type Nickname: string // 타입의 별명을 지정

type Player = {
    nickname:Nickname // 타입을 어떠한 변수에 지정
    team:Team
    health:Health
}

const nico: Player = {
    nickname:"nico",
    team:"red",
    health:10
}
```
- interface: 오브젝트의 모양을 특정하는 키워드, type과는 달리 오브젝트에만 쓸 수 있음, property를 축적할 수 있음
```ts
interface User {
    name:string
}

interface User { // property가 축적됨
    health:number
}

interface User {
    lastName:string
}

interface Player extends User {
}

const nico : Player = {
    name:"nico",
    lastName:'n',
    health:10
}
```
## #5.0 ~ #5.8
