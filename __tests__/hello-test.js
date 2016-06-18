jest.unmock('../src/crescent');
import crescent from '../src/crescent';

describe("hello", () => {
  it("minimum-test", () => {
    expect(crescent.hello()).toBe('hello, this is crescent');
  })
})
