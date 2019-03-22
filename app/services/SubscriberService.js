const DbModelService = require('./DbModelService');

module.exports = class SubscriberService extends DbModelService {
  constructor() {
    super('Subscriber');
  }

  async createOne({ email }) {
    const foundSubscriber = await this.getOne({ query: { email } });

    if (foundSubscriber && Object.keys(foundSubscriber) && Object.keys(foundSubscriber).length) {
      return foundSubscriber;
    }

    const newItem = new this._model({ email });
    
    return newItem.save();
  }
};
