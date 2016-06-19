export default class Picture {
  constructor(data) {
    let img = null;
    if (data instanceof Image) {
      img = data;
    } else if (typeof data == 'string') {
      img = new Image();
      img.src = data;
    } else {
      throw 'Invalid data for constructor of Picture';
    }
    this.initialized = new Promise((resolve) => {
      img.onload = () => {
        this.canvas = document.createElement('canvas');
        this.canvas.width = img.width;
        this.canvas.height = img.height;
        const ctx = this.canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, this.canvas.width, this.canvas.height);
        this.bytes = ctx.getImageData(0, 0, img.width, img.height).data;
        resolve(this);
      };
    })
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
      const uri = 'data:image/png;base64,' + btoa(String.fromCharCode.apply(null, this.bytes));
      window.open(uri);
    }
    return this;
  }
}
