const { getDb } = require('./db.js');

const count = async (namespace) => {
  const db = getDb(namespace);
  const total = await db.getCount();
  return { total, namespace };
};

module.exports = count;
