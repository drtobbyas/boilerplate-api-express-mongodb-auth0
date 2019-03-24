const DbModelService = require('./DbModelService');

module.exports = class UserService extends DbModelService {
  constructor({ authService, cryptoService }) {
    super('User');
    this._encodingService = cryptoService;
    this._authService = authService;
  }

  async createOne({ ...userData }) {

    if (!userData.password) {
      userData.password = this._encodingService.getRandomString(4);
    }
    userData.password = await this._encodingService.encode(userData.password);

    return new this._model(userData).save();
  }

  async syncOne(syncData) {
    const remoteId = syncData.sub;
    const query = syncData.email ? { email: syncData.email } : { remoteIdList: remoteId };

    const foundUser = await this.getOne({ query, options: { lean: true, select: '+role' } });

    if (foundUser && foundUser.isSynced) {
      if (foundUser.remoteIdList && foundUser.remoteIdList.includes(remoteId)) {
        return foundUser;
      }
      const options = { new: true };
      return this._model.update({ $addToSet: { remoteIdList: [remoteId] } }, { query, options });
    }

    const mappedSyncData = {
      firstName: syncData.given_name || '',
      lastName: syncData.family_name || '',
      email: syncData.email || '',
      image: syncData.picture || '',
      username: syncData.nickname || '',
      remoteIdList: [remoteId],
      isSynced: true,
    };

    return this.model.createOne(mappedSyncData);
  }

  findByRemoteId(remoteId) {
    if (!remoteId) {
      throw new ReferenceError('remote id not provided');
    }
    const query = { remoteIdList: remoteId };
    const options = { lean: true };
    return this.getOne({ query, options });
  }

  getRoles() {
    return this._model.ROLES;
  }

  async deleteUser(user) {
    if (!(user && user._id)) {
      throw new ReferenceError('user id not provided');
    }

    const userId = user._id;
    const { remoteIdList } = user;
    const removeRemoteUserList = [];

    remoteIdList.forEach((singleItem) => {
      removeRemoteUserList.push(this._authService.deleteUserById(singleItem));
    });

    return Promise.all([
      ...removeRemoteUserList,
      this.removeById(userId),
    ]);

  }

};
