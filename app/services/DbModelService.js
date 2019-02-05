const MainService = require('./MainService');
const DbService = require('./DbService');

const DEFAULT_SKIP = 0;
const DEFAULT_LIMIT = 20;
const MAX_LIM = 100;

module.exports = class DbModelService extends MainService {


  static aggregate(modelName, pipeline) {
    return DbService.models(modelName).aggregate(pipeline);
  }

  static createOne(modelName, data) {
    const ModelConstructor = DbService.models(modelName);
    const newItem = new ModelConstructor(data);
    return newItem.save();
  }

  static findOne(modelName, { query = {}, options = {} }) {
    if (!modelName) {
      throw new ReferenceError('model name is not provided');
    }
    const requestOptions = getRequestOptions(options);

    return DbService.models(modelName)
      .findOne(query)
      .populate(requestOptions.populate)
      .select(requestOptions.select)
      .lean(requestOptions.lean);
  }

  static findAll(modelName, { query = {}, options = {} }) {

    const requestOptions = getRequestOptions(options);

    return DbService.models(modelName)
      .find(query)
      .sort(requestOptions.sort)
      .limit(Number(requestOptions.limit))
      .skip(Number(requestOptions.skip))
      .populate(requestOptions.populate)
      .select(requestOptions.select)
      .lean(requestOptions.lean);
  }

  static findById(modelName, id, options) {
    if (!modelName) {
      throw new ReferenceError('model name is not provided');
    }

    if (!id) {
      throw new ReferenceError(`${modelName} id is not provided`);
    }

    const requestOptions = getRequestOptions(options);

    return DbService.models(modelName).findById(id).populate(requestOptions.populate).select(requestOptions.select).lean(requestOptions.lean);
  }

  static updateById(modelName, id, updateData, options) {
    return update(modelName, updateData, { options, query: { _id: id } });
  }

  static update(modelName, updateData, { query = {}, options = {} }) {
    return update(modelName, updateData, { options, query });
  }

  static deleteById(modelName, id) {
    if (!modelName) {
      throw new ReferenceError('model name is not provided');
    }

    if (!id) {
      throw new ReferenceError(`${modelName} id is not provided`);
    }

    return DbService.models(modelName).remove({ _id: id });
  }

  static delete(modelName, query) {
    if (!modelName) {
      throw new ReferenceError('model name is not provided');
    }
    return DbService.models(modelName).remove(query);
  }
};

const getRequestOptions = (options) => {
  return {
    lean: !!(options && options.lean),
    select: options.select || '',
    skip: options.skip || DEFAULT_SKIP,
    limit: (options.limit && options.limit <= MAX_LIM) ? options.limit : DEFAULT_LIMIT,
    populate: options.populate || '',
    sort: options.sort || '',
  };
};

const update = (model, updateData, { query = {}, options = {} }) => {
  const mappedOptions = Object.assign(options, { new: true });
  return DbService.models(model).findOneAndUpdate(query, updateData, mappedOptions);
};
