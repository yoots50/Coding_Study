import crypto from "crypto";

interface BlockShape {
  hash: string; // 블록이 가진 해쉬값
  prevHash: string; // 이전 블록의 해쉬값
  height: number; // 블록의 위치
  data: string; // 블록이 가진 데이터
}

class Block implements BlockShape {
  public hash: string;
  constructor(
    public prevHash: string,
    public height: number,
    public data: string
  ) {
    this.hash = Block.calculateHash(prevHash, height, data); // static 함수이기에 인스턴스 없이도 사용가능함
  }
  static calculateHash(prevHash: string, height: number, data: string) {
    const toHash = `${prevHash}${height}${data}`;
    return crypto.createHash("sha256").update(toHash).digest("hex");
  }
}

class Blockchain {
  private blocks: Block[];
  constructor() {
    this.blocks = []; // 블록체인 초기화
  }
  private getPrevHash() { // 이전 해쉬값 받아오기
    if (this.blocks.length === 0) return ""; // 첫 블록은 이전 해쉬값이 없음
    return this.blocks[this.blocks.length - 1].hash; // 나머지 해쉬는 그 이전 블럭의 해쉬값을 리턴
  }
  public addBlock(data:string) { // 블록 추가
    const newBlock = new Block(this.getPrevHash(), this.blocks.length + 1, data); // 새 블록 생성
    this.blocks.push(newBlock); // 새 블럭 추가
  }
  public getBlocks() {
    return [...this.blocks]; // 보안을 위해 새 배열을 리턴
  }
}

const blockchain = new Blockchain();

blockchain.addBlock("First one");
blockchain.addBlock("Second one");
blockchain.addBlock("Third one");

console.log(blockchain.getBlocks())