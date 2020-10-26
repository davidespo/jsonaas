const { getDb } = require('./db.js');

const list = async (namespace, limit, offset) => {
  const db = getDb(namespace);
  // https://www.npmjs.com/package/snap-db#queryqueryargs-ondata-key-any-data-string--void-oncomplete-err-any--void-void
  const options = { limit, offset };
  if (!options.offset || options.offset < 0) {
    options.offset = 0;
  }
  if (!options.limit || options.limit <= 0) {
    options.limit = 25;
  } else {
    options.limit = Math.min(100, options.limit);
  }
  const data = await db.queryIt(options);
  const content = [];
  for await (let [key, value] of data) {
    results.push({
      ...JSON.parse(value),
      key,
      namespace,
    });
  }
  const next = {
    limit: options.limit,
    offset: options.offset + options.limit,
  };
  return {
    content,
    options,
    next,
  };
};

module.exports = list;
