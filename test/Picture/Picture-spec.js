import {Picture} from '../../src/crescent';

describe('Picture', () => {
  describe('constructor', () => {
    it('should initialize Uint8ClampedArray', () => {
      let pic = new Picture(base64samples['01']);
      expect(pic instanceof Picture).to.be.true;
      return pic.initialized.then((pic) => {
        expect(pic.binary instanceof Uint8ClampedArray).to.be.true;
        expect(pic.canvas instanceof HTMLCanvasElement).to.be.true;
      })
    })
  })
  describe('binarize', () => {
    it('should binarize picture', () => {
      let pic = new Picture(base64samples['01']);
      expect(pic instanceof Picture).to.be.true;
      return pic.initialized.then(pic => {
        return pic.binarize();
      }).then(pic => {
        pic.chunks().map(chunk => {
          expect(chunk.every(hex => {
            return (hex == 0 || hex == 255);
          })).to.be.true;
        });
        // pic.debug().open();
      })
    })
  })
})

const base64samples = {
  '01': `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAQCAYAAA
DagWXwAAABmElEQVQYVz2Ry2sTcRSFvzuJCXahiIWQdTZ2p66tRtpGa4KF7r
NrRRBfO1tBfEG7cCrEVIxKQhCDu/oH9CEonSLE4MJFrTVdqNiCJFlEw8xkrv
wG9K7u5RwOl+/IeGZUo9Eovu8Ti8Xo9XrE43GCIECyZzMaiURwXfe/aEz9fh
85nx1XVQ2dZjzPC03GLOfOjKllWYhIGG32f0lhbDqdDoVEIkGn0+HN2hqe7y
OlxaIODh6mUq2EsQv2Qx4VCjS3m8injw39vLlJqfSEQJWZ2Zs06h9YXl5FNt
691aGhIzwuFnGcdW7MzFKpVvm5u4dcvDCl92/f4dDBA6w7DktLr9naaeL6fW
Rs5LROZHNkRkdIpVJ8be5w695dfrXayKuXL3R76wvvNxzy+TwTk5OsrKxSKC
4i3p/fOj09xY/v38JvbXuB6L4Y165eR1p7u/rAtqk36liWcPnSFTrtDs+ePk
fm5+Y1l8tRLpdDSseOHqdWqxEEigwPp3VgYD/JZJJut0ur1cZzfUxTcvLEKT
XQDU/D1YA3RZj7L2qywhYdojh0AAAAAElFTkSuQmCC`.split('\n').join(''),
  '02': `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAATCAYAAA
BcFRdeAAABtUlEQVQoU02RTU9TURCG3zmncBPjFbsBJOkG9+UPiDSFloMWk7
oDkkLCx6J8gyG2IYXElQRxR/wBFu62+LFU0gTWQCrxB/CxgI0t3rbQe4fcU5
s4m8k58z7nnTlDL1WUAUAI4SUdzAwiAqlIL3sFfSDShYaYYgP93Lj4n9TA4A
ulpa7ratILx3F0pkg4xIZh6IInaHh6AhqI9ulnpZTaz+/3IxgMolAogOKvYl
wulzXxOh7HQ9NELpdDsVgExVSUHxgGZmZncXZxjs87WUjhq4/jNTSXTOJJRw
feplNwXYaQUjdF79YznFpZwdLiIuxqFbZt4+r6uk6enhzx40ct2PuyB6UU2t
rbYVkWdi0LVP1b4nw+jw+bmzBNE+83NtDa2oapySnQXfmGv377jk/b2wARRo
ZHMDQ0jOXlN6Bbu8Q/fu7j49YW2HWhogrz8wsYn5gA/f51wkL4MD2dhIDAWG
IUnZ1PsbqWASUSY5xJp3FweIjj4yM87wkhu5PFn1IRFOrp42YpEQgEUKlWcH
F5qef0/CncHf63T4GaU9Pf6PM11bcUftbFQkiQkLitVDQliFCrObgHN8y8iT
QsWw0AAAAASUVORK5CYII=`.split('\n').join('')
}
