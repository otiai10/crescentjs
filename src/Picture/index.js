
export class Results extends Array {
  constructor(arr) {
    super(...arr);
    this.debug = (context) => {
      if (typeof context.open != "function") return;
      if (this.length == 0) return;
      let canvas = document.createElement('canvas');
      canvas.width = this[0].frame.width * 5;
      canvas.height = this[0].frame.height * this.length;
      let ctx = canvas.getContext('2d');
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "black";
      this.map((result, i) => {
        ctx.putImageData(
          new ImageData(result.diff, result.frame.width, result.frame.height),
          0, result.frame.height * i,
          0, 0,
          result.frame.width, result.frame.height
        );
        ctx.font = "12px Helvetica";
        ctx.fillText(
          `${result.score}`,
          result.frame.width + 8,
          result.frame.height * (i + 1) - 2
        );
      });
      const uri = canvas.toDataURL();
      window.open(uri);
    }
  }
  /* XXX: why it doesn't work?
  debug(context) {
  }
  */
}
export default class Picture {
  constructor(data) {
    this.canvas = document.createElement('canvas');
    let img = new Image();
    this.initialized = new Promise(resolve => {
      img.onload = () => {
        this.canvas.width = img.width;
        this.canvas.height = img.height;
        this.frame = {
          width: img.width,
          height: img.height
        };
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
  static init(data) {
    let pic = new Picture(data);
    return pic.initialized;
  }
  hello() {
    return 'hello, this is crescent.Image';
  }
  getBrightness(r, g, b, a) {
    return ((r + g + a) / 3) * (a/255);
  }
  binarize(threshold = 140) {
    for (let i = 0; i < this.bytes.length; i += 4) {
      const brightness = this.getBrightness(...this.bytes.slice(i, i+4));
      if (brightness > threshold) {
        this.bytes[i] = this.bytes[i+1] = this.bytes[i+2] = 255; // WHITE
      } else {
        this.bytes[i] = this.bytes[i+1] = this.bytes[i+2] = 0; // BLACK
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
    return Promise.all(tasks).then(results => { return Promise.resolve(new Results(results)); });
  }
  compare(pic) {
    const _mychunks = this.chunks();
    const yourchunks = pic.chunks();
    let diffchunks = Uint8ClampedArray.from(this.bytes);
    if (this.binarized) {
      const totalscore = _mychunks.map((chunk, i) => {
        const abs = Math.abs(chunk[0] - yourchunks[i][0]);
        diffchunks[i * 4 + 0] = abs;
        diffchunks[i * 4 + 1] = abs;
        diffchunks[i * 4 + 2] = abs;
        diffchunks[i * 4 + 3] = 255;
        return abs;
      }).reduce((total, score) => {
        return total + score;
      }) / _mychunks.length;
      return Promise.resolve({
        frame: {...this.frame},
        diff: diffchunks,
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
