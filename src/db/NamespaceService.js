const { getDb } = require('./db.js');
const Namespace = require('./Namespace.js');

const COL_DB_NAME = 'internal.ns';

const COL_CACHE = {};

class NamespaceService {
  constructor(dbSupplier) {
    this.dbSupplier = dbSupplier;
    this.nsDb = new Namespace(getDb(COL_DB_NAME));
  }
  async updateNs(namespace, meta = {}) {
    meta.namespace = namespace;
    meta.internal = namespace.startsWith('internal');
    await this.nsDb.put(namespace, meta);
    if (!COL_CACHE[namespace]) {
      COL_CACHE[namespace] = new Namespace(getDb(namespace));
    }
    return meta;
  }
  async ns(namespace) {
    if (!COL_CACHE[namespace]) {
      const meta = await this.nsDb.get(namespace);
      if (!meta) {
        throw new Error(`Namespace "${namespace}" does not exist.`);
      }
      COL_CACHE[namespace] = new Namespace(getDb(namespace));
    }
    return COL_CACHE[namespace];
  }
  async meta(namespace) {
    return await this.nsDb.get(namespace);
  }
  async all() {
    return (await this.nsDb.list()).map((row) => row.value);
  }
}

NamespaceService.jaas = new NamespaceService(getDb);

module.exports = NamespaceService;
