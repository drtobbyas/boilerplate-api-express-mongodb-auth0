const authProvider = require('auth0');
const { ManagementClient } = authProvider;
const config = require('../../config/app').auth.authProvider;

const management = new ManagementClient({
  domain: config.domain,
  clientId: config.clientId,
  clientSecret: config.secret,
  scope: 'delete:users',
});

module.exports = {
  deleteUserByRemoteId(remoteId) {
    if (!remoteId) {
      throw new ReferenceError('remote id is not provided');
    }
    return management.deleteUser({ id: remoteId });
  },
};
