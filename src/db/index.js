module.exports = {
  getDb: require('./db.js').getDb,
  count: require('./count.js'),
  get: require('./get.js'),
  list: require('./list.js'),
  put: require('./put.js'),
  remove: require('./remove.js'),
  truncate: require('./truncate.js'),
};
