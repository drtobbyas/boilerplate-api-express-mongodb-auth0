const DbService = require(`${basePath}/app/services/DbService`);
const MODEL_NAME = 'Subscriber';

module.exports = {
  async create({ email }) {
    const Model = DbService.models(MODEL_NAME);
    const foundSubscriber = await Model.findOne({ email }).select('email').lean();

    if (foundSubscriber && Object.keys(foundSubscriber) && Object.keys(foundSubscriber).length) {
      return foundSubscriber;
    }
    
    const newItem = new Model({ email });
    return newItem.save();
  },

  getAll() {
    // do something
  },
};
