const CryptoService = require('../../../app/services/CryptoService');
const cryptoService = new CryptoService();

describe('# Services: Crypto Service', () => {

  describe('# Method: getRandomString', () => {
    it('5 to equal 10', () => {
      expect(cryptoService.getRandomString(5)).toHaveLength(10);
    });

    it('0 to throw error', () => {
      expect(() => cryptoService.getRandomString(0)).toThrowError(TypeError);
    });
  });

  describe('# Method: encode', () => {
    it('to return encoded string', async () => {
      const result = await cryptoService.encode('string');
      expect(typeof result).toBe('string');
    });

    it('empty string to throw error', async () => {
      expect(cryptoService.encode()).rejects.toThrowError(TypeError);
    });
  });

  describe('# Method: verifyPassword', () => {
    it('to return true with valid string', async () => {
      const string = 'string-password';
      const hashedString = await cryptoService.encode(string);
      const isValid = await cryptoService.verifyPassword(string, hashedString);
      expect(isValid).toEqual(true);
    });

    it('to return false with invalid string', async () => {
      const string = 'string-password';
      const hashedString = await cryptoService.encode(string);
      const isValid = await cryptoService.verifyPassword('invalid string', hashedString);
      expect(isValid).toEqual(false);
    });
  });

});
