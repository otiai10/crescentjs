import {Picture} from '../../src/crescent';

describe('Picture', () => {
  describe('constructor', () => {
    it('should initialize Uint8ClampedArray', () => {
      let pic = new Picture(base64samples['01']);
      expect(pic instanceof Picture).to.be.true;
      return pic.initialized.then((pic) => {
        expect(pic.bytes instanceof Uint8ClampedArray).to.be.true;
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
QsWw0AAAAASUVORK5CYII=`.split('\n').join(''),
  '03': `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCA
gICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDREND
g8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQE
BAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARC
AAqACQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcIC
QoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBk
aEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTV
FVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp
6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09
fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAA
gECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzU
vAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZ
GVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0t
ba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oAD
AMBAAIRAxEAPwD9U6KK+WP+CgX7YFj+yn8JHbQbmKXx/wCKFks/Dtsyhvs+B
iW+kU8bIgRtBB3SMgwV3lQCr8Vv+CkHwL+Ffx3tf2fptM8Q6/r0l7Z6dd3Wk
x272lld3EgUQSPJKpLoGQvtBC7tudyso+sa/nD0H4ffEDwH8fPhRd/EmKZdW
8YajovilRczNJdPBdX/AMkk5bkSSbDJgknEik4YkD+jygAooooA474s/FLwf
8Fvh1rnxP8AHmpCy0TQbVrm4YYMkjZwkUYJG6R3Koq5GWYDI61+V/7LXwy8Z
f8ABR/9qTWf2nfjfp+7wD4Zu0jt9MkJktpXj+e10qPIAaKNWEsxx85flf35I
9t/4K+fDn47fFPRPhr4X+E/gzxV4m0eO41O91iz0axkuYluEW3W2kmEYOCFk
uQuf7z4718+fCn4tf8ABT74KeANH+GXw8/Zr1PTtD0SHyoIv+EDuGd2JLPLI
38cjsWZm7knoOKALn/BR4Af8FIvhsAMAQ+Gf/TjJX7F1/O/+0N8TP2n/Gf7Q
3h7xl8afBF3o/xHsU01dK02TQpLR5hFOz2xW3bmTdKWHGdxG3tiv1Z/YT+MP
7ZnxO8Q+LbP9qT4cXXhmxsLO1l0iSfw7LpvmzM7iRVZzh8KFyByMj1oA+x6K
KKACiiigD8p/wBvj4MfGHxl+358PvGPhH4U+MNc0Czi8PC51XTtDurmzgMd/
I0m+aNCibVIZskYBBOBX6sUUUAFFFFAH//Z`.split('\n').join('')
}
