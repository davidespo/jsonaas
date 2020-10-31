const Namespace = require('./Namespace.js');
const NamespaceService = require('./NamespaceService.js');
const jaas = NamespaceService.jaas;

module.exports = {
  getDb: require('./db.js').getDb,
  jaas,
  NamespaceService,
  Namespace,
};
