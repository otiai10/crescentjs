jest.unmock('../src/crescent');
jest.unmock('../src/Img');
import crescent from '../src/crescent';

describe("hello", () => {
  it("minimum-test", () => {
    expect(crescent.hello()).toBe('hello, this is crescent');
    const img = new crescent.Img();
    expect(img.hello()).toBe('hello, this is crescent.Image');
  })
})
