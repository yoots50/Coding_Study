// @ts-check 타입스크립트에게 자바스크립트 파일을 확인하라 함
/**
 * 이 함수의 각주
 * Initializes the project
 * config의 타입을 지정
 * @param {object} config
 * config.debug의 타입을 지정
 * @param {boolean} config.debug 
 * @param {string} config.url 
 * 함수의 리턴값의 타입을 지정
 * @returns boolean 
 */
export function init(config) {
  return true;
}
/**
 * Exits the program
 * @param {number} code 
 * @returns number
 */
export function exit(code) {
  return code + 1;
}
