const DbService = require('./DbService');

module.exports = class DbModelService {
  constructor(modelName) {
    if (!modelName) {
      throw new ReferenceError('model name is not provided');
    }

    this._DbProvider = DbService;
    this._model = this._getRepository(modelName);
    this._modelName = modelName;
    this._CONSTANTS = {
      DEFAULT_SKIP: 0,
      DEFAULT_LIMIT: 20,
      MAX_LIM: 100,
    };
  }

  _getRepository(modelName) {
    return this._DbProvider.models(modelName);
  }

  _mapQueryOptions(options) {
    return {
      lean: !!(options && options.lean),
      select: options.select || '',
      skip: options.skip || this._CONSTANTS.DEFAULT_SKIP,
      limit: (options.limit && options.limit <= this._CONSTANTS.MAX_LIM) ? options.limit : this._CONSTANTS.DEFAULT_LIMIT,
      populate: options.populate || '',
      sort: options.sort || 'desc',
    };
  }

  aggregate(pipeline) {
    return this._getRepository(this._modelName).aggregate(pipeline);
  }

  createOne(data) {
    return new this._model(data).save();
  }

  getOne({ query = {}, options = {} }) {
    const queryOptions = this._mapQueryOptions(options);

    return this._model
      .findOne(query)
      .populate(queryOptions.populate)
      .select(queryOptions.select)
      .lean(queryOptions.lean);
  }

  getById(id, options = {}) {
    if (!id) {
      throw new ReferenceError('id is not provided');
    }

    const queryOptions = this._mapQueryOptions(options);

    return this._model.findById(id).populate(queryOptions.populate).select(queryOptions.select).lean(queryOptions.lean);
  }

  getMany({ query = {}, options = {} }) {

    const queryOptions = this._mapQueryOptions(options);

    return this._model
      .find(query)
      .sort(queryOptions.sort)
      .limit(Number(queryOptions.limit))
      .skip(Number(queryOptions.skip))
      .populate(queryOptions.populate)
      .select(queryOptions.select)
      .lean(queryOptions.lean);
  }

  updateOne(updateData, { query = {}, options = {} }) {
    const mappedOptions = { ...options, new: true };
    return this._model.findOneAndUpdate(query, updateData, mappedOptions);
  }

  updateById(id, updateData, options) {
    if (!id) {
      throw new ReferenceError('id is not provided');
    }

    const mappedOptions = { ...options, new: true };

    return this._model.findOneAndUpdate({ _id: id }, updateData, mappedOptions);
  }

  upsert({ query, data }) {
    return this._model.findOneAndUpdate(query, data, { upsert: true, new: true });
  }

  removeById(id) {
    if (!id) {
      throw new ReferenceError('id is not provided');
    }

    return this._model.remove({ _id: id });
  }

  remove(query) {
    return this._model.remove(query);
  }
};
