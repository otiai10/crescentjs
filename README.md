# crescentjs [![CircleCI](https://circleci.com/gh/otiai10/crescentjs.svg?style=svg)](https://circleci.com/gh/otiai10/crescentjs)

JavaScript Image Comparsion

# Installation

```
npm install crescent
```

# Comparsion

| pic1 | pic2 |
|:----:|:----:|
| <img src="https://cloud.githubusercontent.com/assets/931554/16201656/b5f3ff34-3712-11e6-9c7f-100b3441f7fc.jpeg" width="100px"> | <img src="https://cloud.githubusercontent.com/assets/931554/16201665/befbb036-3712-11e6-8fc4-e41af9aacd75.jpeg" width="100px"> |

```javascript
import {Picture} from 'crescent';

let pic1 = new Picture('date:image/png;base64,/iV....');
let pic2 = new Picture('date:image/png;base64,/iV....');

Promise.all([pic1.initialized, pic2.initialized]).then(() => {
  return pic1.compareTo(pic2);
}).then(results => {
  console.log(results[0].score); // 0.6517857142857143
});
```

# Binarization

| original | binarized |
|:--------:|:---------:|
| <img src="https://cloud.githubusercontent.com/assets/931554/16201662/ba3e0b0c-3712-11e6-924a-ec0898a71402.jpeg" width="100px"> | <img src="https://cloud.githubusercontent.com/assets/931554/16201681/cd377c7a-3712-11e6-885a-01a251e5a8fe.png" width="100px"> |

```javascript
let pic = new Picture('date:image/png;base64,/iV....');
pic.initialized.then(() => {
  pic.binarize();
  pic.debug().open(); // window.open('data:image/png;base64,....')
});
```

# Visual Diff

// TODO

# Development

```
npm install && npm start
npm run ci
npm run release
```
