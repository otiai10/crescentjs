export default class Img {
  constructor() {
    this.binary = new Uint8Array(10);
    this.canvas = document.createElement('canvas');
  }
  hello() {
    return 'hello, this is crescent.Image';
  }
}
