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
        this.binary = ctx.getImageData(0, 0, img.width, img.height).data;
        resolve(this);
      };
    })
  }
  hello() {
    return 'hello, this is crescent.Image';
  }
}
