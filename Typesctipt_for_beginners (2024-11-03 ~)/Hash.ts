type Words = {
  [key: string]: string; // 제한된 양의 property 또는 key를 가지는 타입을 정의할 때 이와같은 방식을 씀
};

class Dict {
  private words: Words; // words가 constructor로 인해 초기화 됨을 방지하기 위함
  constructor() {
    this.words = {}; // words를 수동으로 초기화
  }
  add(word: Word) {
    // class를 타입처럼 사용가능, word가 Word의 인스턴스임
    if (this.words[word.term] === undefined) {
      this.words[word.term] = word.def;
    }
  }
  def(term: string) {
    return this.words[term];
  }
  del(term: string) {
    // 단어를 삭제
    if (this.words[term] !== undefined) {
      delete this.words[term];
    }
  }
  update(term: string, def: string) {
    // 단어를 업데이트
    if (this.words[term] !== undefined) {
      this.words[term] = def;
    }
  }
}

class Word {
  constructor(public readonly term: string, public def: string) {} // public 상태에서 값을 보여주고는 싶지만 수정불가하게 만들고 싶을 땐 readonly를 붙임
  addDef(def: string) {
    // 단어를 수정, 추가
    this.def = def;
  }
  print() {
    // 단어를 출력
    console.log(`${this.term} : ${this.def}`);
  }
}

const kimchi = new Word("kimchi", "한국의 음식");

const dict = new Dict();

dict.add(kimchi);
dict.def("kimchi");
