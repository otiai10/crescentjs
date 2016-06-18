jest.unmock('../../src/Img');
import Img from '../../src/Img';

describe('Img', () => {
  it('foo', () => {
    const img = new Img();
    expect(img.hello()).toBe('hello, this is crescent.Image');
  })
  it('should have Uint8Array and HTMLCanvasElement', () => {
    const img = new Img();
    expect(img.binary instanceof Uint8Array).toBe(true);
    expect(img.canvas instanceof HTMLCanvasElement).toBe(true);
  })
})
