const { DbService } = require(`${basePath}/app/services`);
const schema = require('./schemas/subscriber.schema');

const Model = DbService.createModel('Subscriber', schema);

module.exports = Model;
