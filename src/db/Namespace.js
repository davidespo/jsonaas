class Namespace {
  constructor(db) {
    this.db = db;
  }
  async count() {
    return await this.db.getCount();
  }
  async get(key) {
    const result = await this.db.get(key);
    if (!!result) {
      return JSON.parse(result);
    }
    return result;
  }
  async list(options = {}) {
    // options => https://www.npmjs.com/package/snap-db#queryqueryargs-ondata-key-any-data-string--void-oncomplete-err-any--void-void
    const data = await this.db.queryIt(options);
    const content = [];
    const keys = new Set(); // TODO: ensure latest when duplicates are present
    for await (let [key, value] of data) {
      if (!keys.has(key)) {
        keys.add(key);
        try {
          value = JSON.parse(value);
        } catch (error) {}
        content.push({ key, value });
      }
    }
    return content;
  }
  async put(key, value) {
    // TODO: write meta? e.g. createdAt, updatedAt, createdBy, updatedBy, ...
    await this.db.put(key, JSON.stringify(value));
  }
  async remove(key) {
    let value = await this.get(key);
    if (!!value) {
      await this.db.del(key);
    }
    return value;
  }
  async truncate() {
    await this.db.empty();
  }
}

module.exports = Namespace;
