type Words = {
    [key:string]: string // 제한된 양의 property 또는 key를 가지는 타입을 정의할 때 이와같은 방식을 씀
}

const dict:Words = {
    "potato": "food"
}

class Dict {
    private words: Words
    constructor(
        public term:string,
        public def:string    
    ) {}
}

