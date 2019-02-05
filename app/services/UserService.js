const DbService = require(`${basePath}/app/services/DbService`);
const AuthService = require('./AuthService');
const DbModelService = require('./DbModelService');
const MODEL_USER = 'User';

module.exports = class UserService extends DbModelService {
  static async syncOne(syncData) {

    const remoteId = syncData.sub;
    const query = syncData.email ? { email: syncData.email } : { remoteIdList: remoteId };

    const foundUser = await DbModelService.findOne(MODEL_USER, { query, options: { lean: true, select: '+role' } });

    if (foundUser && foundUser.isSynced) {
      if (foundUser.remoteIdList && foundUser.remoteIdList.includes(remoteId)) {
        return foundUser;
      }
      const options = { new: true };
      return DbModelService.update(MODEL_USER, { $addToSet: { remoteIdList: [remoteId] } }, { query, options });
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

    return DbModelService.createOne(MODEL_USER, mappedSyncData);
  }

  static createOne(data) {
    return DbModelService.createOne(MODEL_USER, data);
  }

  static findOne(params) {
    return DbModelService.findOne(MODEL_USER, params);
  }

  static findById(userId) {
    if (!userId) {
      throw new ReferenceError('user id not provided');
    }
    const query = { _id: userId };
    const options = { lean: true };
    return DbModelService.findOne(MODEL_USER, { query, options });
  }

  static findByRemoteId(remoteId) {
    if (!remoteId) {
      throw new ReferenceError('remote id not provided');
    }
    const query = { remoteIdList: remoteId };
    const options = { lean: true };
    return DbModelService.findOne(MODEL_USER, { query, options });
  }

  static findAll(params) {
    return DbModelService.findAll(MODEL_USER, params);
  }

  static getRoles() {
    return DbService.models(MODEL_USER).ROLES;
  }

  static incStatGifted(userId) {
    return DbService.models(MODEL_USER).update({ _id: userId }, { $inc: { 'stats.gifted': 1 } });
  }

  static decStatGifted(userId) {
    return DbService.models(MODEL_USER).update({ _id: userId }, { $inc: { 'stats.gifted': -1 } });
  }


  static incStatGot(userId) {
    return DbService.models(MODEL_USER).update({ _id: userId }, { $inc: { 'stats.got': 1 } });
  }

  static decStatGot(userId) {
    return DbService.models(MODEL_USER).update({ _id: userId }, { $inc: { 'stats.got': -1 } });
  }

  static updateOne(userId, updateData) {
    if (!userId) {
      throw new ReferenceError('user id not provided');
    }
    const query = { _id: userId };
    const options = { new: true };

    return DbModelService.update(MODEL_USER, updateData, { query, options });
  }

  static upsert({ query, data }) {
    return DbService.models(MODEL_USER).findOneAndUpdate(query, data, { upsert: true, new: true });
  }

  async create() {
    const self = this;

    if (!self._userData.password) {
      self._userData.password = self._EncodeService.getRandomString(4);
    }

    const encodeProvider = new self._EncodeService();
    self._userData.password = await encodeProvider.encode(self._userData.password);

    return new self._userProvider(self._userData).save();
  }

  static async deleteUser(user) {
    if (!(user && user._id)) {
      throw new ReferenceError('user id not provided');
    }

    const userId = user._id;
    const { remoteIdList } = user;
    
    const removeRemoteUserList = [];
    remoteIdList.forEach((singleItem) => {
      removeRemoteUserList.push(AuthService.deleteUserByRemoteId(singleItem));
    });

    return Promise.all([
      ...removeRemoteUserList,
      DbModelService.deleteById(MODEL_USER, userId),
    ]);

  }
};
