import crescent from '../src/crescent';

describe('crescent', () => {
  describe('hello', () => {
    it('should greet', () => {
      expect(crescent.hello()).to.eq('hello, this is crescent')
    })
  })
})
