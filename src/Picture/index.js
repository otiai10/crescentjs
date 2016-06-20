export default class Picture {
  constructor(data) {
    const INDICATOR = /((data):(image\/([a-zA-Z]+));(base64),).+/;
    const matched = data.match(INDICATOR);
    if (!matched) throw 'Invalid image base64 data';
    if (matched.length < 3) throw 'Invalid format of base64';

    const base64string = data.replace(matched[1], '');

    this.prefix = matched[1]; // TODO

    const raw = data.replace(this.prefix, '');
    this.bytes = new Uint8ClampedArray(raw.length);
    atob(raw).split('').map((char, i) => {
      this.bytes[i] = char.charCodeAt(0);
    });
  }
  hello() {
    return 'hello, this is crescent.Image';
  }
  binarize(threshold = (255/2) * 4) {
    // 全部じゃないっぽいぞ　
    for (let i = 0; i < this.bytes.length; i += 4) {
      if (this.bytes[i] + this.bytes[i+1] + this.bytes[i+2] + this.bytes[i+3] > threshold) {
        this.bytes[i] = this.bytes[i+1] = this.bytes[i+2] = this.bytes[i+3] = 255;
      } else {
        this.bytes[i] = this.bytes[i+1] = this.bytes[i+2] = this.bytes[i+3] = 0;
      }
    }
    return Promise.resolve(this);
  }
  chunks() {
    let pool = [];
    for (let i = 0; i < this.bytes.length; i += 4) {
      pool.push(this.bytes.slice(i, i+4));
    }
    return pool;
  }
  debug() {
    this.open = () => {
      const uri = this.prefix + btoa(String.fromCharCode.apply(null, this.bytes));
      if (window && typeof window.open == 'function') window.open(uri);
      else console.log(uri);
    }
    return this;
  }
}
