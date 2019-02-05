const _ = require('lodash');
const { DbService } = require(`${basePath}/app/services`);
const userEnums = require(`${basePath}/app/enums`).USER;
const userRolesEnums = _.values(userEnums.ROLES);

const schemaData = {
  remoteIdList: [{ type: String, required: true }],
  isSynced: { type: Boolean, default: false, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  image: { type: String },
  role: { type: String, enum: userRolesEnums, default: userEnums.ROLES.REGULAR_USER, required: true, select: false },
  bio: { type: String },
  stats: {
    gifted: { type: Number, default: 0 },
    got: { type: Number, default: 0 },
  },
};

const schemaOptions = {
  toJSON: { getters: true },
  toObject: { getters: true },
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
};

module.exports = DbService.createSchema(schemaData, schemaOptions);
