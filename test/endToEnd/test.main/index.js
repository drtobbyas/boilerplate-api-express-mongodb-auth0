const request = require('supertest');
const { expect } = require('chai');

module.exports = (app) => {
  describe('# GET /api', () => {
    it('# Positive: Should get the API uptime', async () => {
      const response = await request(app).get('/api');

      expect(response.statusCode).to.equal(200);
      expect(response.body).to.be.a('object');
      expect(response.body.uptime).to.be.a('string');

      return true;
    });
  });

  describe('# GET /api/status/', () => {
    it('# Positive: Should get the API status (including uptime)', async () => {
      const response = await request(app).get('/api/status/');

      expect(response.statusCode).to.equal(200);
      expect(response.body).to.be.a('object');
      expect(response.body.status).to.be.a('string');
      expect(response.body.status).to.equal('OK');
      expect(response.body.uptime).to.be.a('string');
      
      return true;
    });
  });
};
