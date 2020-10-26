const { getDb } = require('./db.js');

const remove = async (namespace, key) => {
  const db = getDb(namespace);
  let data = await db.get(key);
  if (!!data) {
    await db.del(key);
    data = JSON.parse(data);
  } else {
    data = { value: null };
  }
  return { ...data, key, namespace };
};

module.exports = remove;
