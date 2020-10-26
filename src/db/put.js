const { getDb } = require('./db.js');

const put = async (namespace, key, value) => {
  const db = getDb(namespace);
  const data = { value, ts: +new Date() };
  await db.put(key, JSON.stringify(data));
  return { ...data, key, namespace };
};

module.exports = put;
