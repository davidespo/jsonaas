const { getDb } = require('./db.js');

const get = async (namespace, key) => {
  const db = getDb(namespace);
  let data = await db.get(key);
  if (!!data) {
    data = JSON.parse(data);
  } else {
    data = { value: null };
  }
  return { ...data, key, namespace };
};

module.exports = get;
