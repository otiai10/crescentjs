export default class Picture {
  constructor(data) {
    this.canvas = document.createElement('canvas');
    let img = new Image();
    this.initialized = new Promise(resolve => {
      img.onload = () => {
        this.canvas.width = img.width;
        this.canvas.height = img.height;
        let ctx = this.canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, img.width, img.height);
        this.bytes = ctx.getImageData(0, 0, img.width, img.height).data;
        // For Safari
        if (this.bytes.slice !== 'function') this.bytes.slice = Array.prototype.slice;
        resolve(this);
      };
    });
    img.src = data;
  }
  hello() {
    return 'hello, this is crescent.Image';
  }
  getDarkness(r, g, b, a) {
    return ((r + g + a) / 3) * (a/255);
  }
  binarize(threshold = 140) {
    for (let i = 0; i < this.bytes.length; i += 4) {
      const darkness = this.getDarkness(...this.bytes.slice(i, i+4));
      if (darkness > threshold) {
        this.bytes[i] = this.bytes[i+1] = this.bytes[i+2] = 0; // BLACK
      } else {
        this.bytes[i] = this.bytes[i+1] = this.bytes[i+2] = 255; // WHITE
      }
      // anyway
      this.bytes[i+3] = 255;
    }
    this.binarized = true;
    // console.log(this.bytes);
    return this;
  }
  chunks() {
    let pool = [];
    for (let i = 0; i < this.bytes.length; i += 4) {
      pool.push(this.bytes.slice(i, i+4));
    }
    return pool;
  }
  compareTo(...pics) {
    const tasks = pics.map(pic => { return this.compare(pic) });
    return Promise.all(tasks);;
  }
  compare(pic) {
    const _mychunks = this.chunks();
    const yourchunks = pic.chunks();
    if (this.binarized) {
      const totalscore = _mychunks.map((chunk, i) => {
        return Math.abs(chunk[0] - yourchunks[i][0]);
      }).reduce((total, score) => {
        return total + score;
      }) / _mychunks.length;
      return Promise.resolve({
        score: (255 - totalscore) / 255
      });
    }
    return Promise.resolve({});
  }
  debug() {
    this.open = () => {
      let ctx = this.canvas.getContext('2d');
      ctx.putImageData(new ImageData(this.bytes, this.canvas.width, this.canvas.height), 0, 0);
      const uri = this.canvas.toDataURL();
      if (window && typeof window.open == 'function') window.open(uri);
      else console.log(uri);
      return Promise.resolve();
    }
    return this;
  }
}
