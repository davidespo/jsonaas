// https://www.npmjs.com/package/snap-db
const { SnapDB } = require('snap-db');

const NS_CACHE = {};

function getDb(namespace) {
  let nsDb = NS_CACHE[namespace];
  if (!nsDb) {
    nsDb = new SnapDB(`.db.${namespace}`);
    nsDb.namespace = namespace;
    NS_CACHE[namespace] = nsDb;
  }
  return nsDb;
}

module.exports = {
  getDb,
};
