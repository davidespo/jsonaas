const { getDb } = require('./db');

const truncate = async (namespace) => {
  const db = getDb(namespace);
  await db.empty();
  return { namespace };
};

module.exports = truncate;
