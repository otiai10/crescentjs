import {Picture} from '../../src/crescent';

describe('Picture', () => {
  describe('constructor', () => {
    it('should initialize Uint8ClampedArray', () => {
      let pic = new Picture(base64samples['01']);
      return pic.initialized.then(pic => {
        expect(pic instanceof Picture).to.be.true;
        expect(pic.bytes instanceof Uint8ClampedArray).to.be.true;
      })
      // pic.debug().open();
    })
  })
  describe('init', () => {
    it('should return initializing promise (short hand for constructor and .initialized)', () => {
      return Picture.init(base64samples['01']).then(pic => {
        expect(pic instanceof Picture).to.be.true;
      })
    })
  })
  describe('binarize', () => {
    it('should binarize picture', () => {
      let pic = new Picture(base64samples['01']);
      return pic.initialized.then(pic => {
        return Promise.resolve(pic.binarize());
      }).then(pic => {
        expect(pic.chunks().every(chunk => {
          return chunk.every(byte => { return (byte == 0 || byte == 255); });
        })).to.be.true;
        // pic.debug().open();
      })
    })
  })
  describe('compareTo', () => {
    it('should return scores', () => {
      let pic1 = new Picture(base64samples['01']);
      let pic2 = new Picture(base64samples['01']);
      // let pic3 = new Picture(base64samples['01']);
      let pic3 = new Picture(base64samples['02']);
      return Promise.all([
        pic2.initialized, pic3.initialized
      ]).then(() => {
        pic1.binarize();
        pic2.binarize();
        pic3.binarize();
        return pic1.compareTo(pic2, pic3)
      }).then(results => {
        expect(results.length).to.eq(2);
        expect(results[0].score).to.eq(1);
        expect(results[1].score).not.to.eq(1);
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
I0m+aNCibVIZskYBBOBX6sUUUAFFFFAH//Z`.split('\n').join(''),
  '04': `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCA
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
AMBAAIRAxEAPwD9U6KK+cP20/2mLf4BfD5tN8O38X/Cb+Io2h0mIrva0i+7J
esvQBekYb70hBw6pIB6WT5Tis9x1LLsFHmqVHZfq32SWrfRIwxOIp4WlKtVd
kih8Uf29vhX8M/ig/wvXR9V167tLiK1v7rTnhMNtcM2Ghy7Dc6ZAYA4VsrkF
WA+nq/CJfDviHw/4t8Ny+JbaaK51k2WrxCZiZZIJ5N0cjZ5+dcOM9VdT3r93
a/QPErhDLOE6eBhl0nN1Iy55XupSi4q66JXb0X3vc8jJMxr5g6rrK1mrLsnc
KKKK/LT3jkPij8SvDHwj8B6t8QfF920Gm6VCZGSMBpZ5CcJDGCRl3YhQCQMn
JKgEj87vgD8O/Fv7cHx+1T4y/FeGaTwnpNyklxCRm3kK82+lxE4HlquGkwCS
uS2HmD163/wUt8H/FbxxH4C0fwJ4T8U+INLhN/c31tpGnz3cKXAEKxSSrCrA
OFeYKW7NJt6tXgnw88d/t5fCnwpZ+CfAfwu8YaXpFkXeOFfAUkjM7sWZ3d7c
s7Ek8kngADAAFfvfBGRywnDE8flWIpRx2JvDmnNRdKmm0+Xd80mr30smmtVr
8lmmLVTHKjiISdKFnZK/NK11fyRY/bxCr+2FGqjAEGkDH4LX6sV+H/xh8W/G
fxV8Tk8Q/FvS9Ss/GOy2CQXmj/Ypiqf6n9wUXOSOPl596/Qj9jj4m/tWeOPG
Gvaf8ffDWtafpNvpyzWM2o+Gm0z/SfNVdqMY0D5QtkcngdOc34jcK4mjw3lt
V1abWGpWlaesruKvDT3l3egsmx8JY2tFRl78rrTbffsfXFFFFfgJ9cFFFFAH
5pfto/CX4qeKv2qYvEPhj4a+KtY0vydLBvrDR7i4twUxvzIiFRjvzx7V+ltF
FfTZ5xNVzzBYLBVKaisNBwTTfvJ21f3dDhwuBjhatWqnfnd/QKKKK+ZO4//2
Q==`.split('\n').join(''),
  '05': `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCA
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
AMBAAIRAxEAPwD9StT1LT9G0671jV76CysbGCS5urmeQJFDEilnd2PCqqgkk
8ACvyv+L3/BZHx1q/jeXwh+y98KNP1SzFy1tZ3+s21zd3WqY6PDaQNG0QOCV
DM7FcEqhyo+2f29PDXxM8afspeOfBvwi0W/1XxJrkNrYRWtkyCWS3e6iFyPn
YDaYfNU98Ma8d/4JYfsq6x8A/hdrnin4m+AZNC+IHiDVJbd2vFRriLTI1j8q
JCrNtRpPNdsYLEJkEIhoA+aLD/grt+1N8NPFVvpvx8+AmjQWkqiV7D+zb7Rb
8xk43xtcPIpHXrHzjG4V+m3wE+OvgH9o74ZaZ8VPhxeTS6XqBeKW3uVCXNlc
IcSW8yAkLIpI6EggqykqwJ8e/4KXaP8M9R/Y+8cXnxIgsvM0+2SbQJ5lXz4t
WLgW4gJ+YMxJVtvWMyZ+XNfPv8AwRETWx8JPiPJceb/AGQ3iO2Fpn7n2kWw8
/HvsNvn/gNAH6TUUUUANXp+PrXl/wC0/wCGPix4z+BPivwz8DtdfRvHF9Dbr
pN8l81m0LLcxNIRMoJTMSyD3zjjOa8h/wCClHxj+NHwI/Z5tfiN8EtdOkala
eI7O31O6/s6C8CWMsUynKzI6KDN5A3YzkgA886H/BOz9o/Wv2k/2drLxJ438
TW2seNdIv7rT9eaOGG3cN5rPbu0MSqqq0DRgEKAxR+pDUAfln+1l+zL/wAFA
PDmjf8ACaftDXPiXxn4e0n5/wC0xr7ata2G7hmMW8vAvAy5jVckZbNfob/wS
n+P/wAL/iT8ED8K/B/gq08Ia54GWM6pYW0jSR3/AJxP+nq7kuzO6sHVixQ7A
DtKAfUXx78WeC/BHwX8a+JfiHeWdt4etdDvFvvtSq0cqPEyCHYSBI0hYIqdX
Zwo5NflX/wRL0XVLj47+PPEMKP/AGdY+EhZ3DDO0TT3kLxA9slbebH0PvQB+
yNFFFAHM/Er4deFPi34C1z4beONOF9ofiGzeyvIc4ba3IdG/hdWCurdVZVI6
V+TWvf8Ex/22v2e/G154h/Zb+ITalZzOY7e60rXf7I1B7fIYR3UcjJE4B7CR
1OM4XO0fsXRQB+N2rfsDf8ABSv9pLVLOz+PvjgWum2cquh8QeJ0u7eDs0kNt
ZmVPM2kjOE3dCwHI/Sn9lH9ljwF+yX8M08AeDZptRvbub7ZrOs3MYSfUbraF
3FQSI41AwkYJCjOSzM7t7RRQAUUUUAf/9k=`.split('\n').join('')
}
