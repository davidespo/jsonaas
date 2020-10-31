const { jaas } = require('../db/index.js');

const VERSION_SLUG = `v1`;
const SLUG = `data`;

const toRoute = (relativePath, method = 'GET') => {
  const path = `/${VERSION_SLUG}/${SLUG}${relativePath}`;
  console.log(`Registering ${method} ${path}`);
  return path;
};

function init(app) {
  app.get(toRoute('/:namespace'), async (req, res) => {
    try {
      const namespace = req.params.namespace;
      const ns = await jaas.ns(namespace);
      const options = {
        limit: parseInt(req.query.limit),
        offset: parseInt(req.query.offset),
      };
      if (!options.offset || options.offset < 0) {
        options.offset = 0;
      }
      if (!options.limit || options.limit <= 0) {
        options.limit = 25;
      } else {
        options.limit = Math.min(100, options.limit);
      }
      const results = await ns.list(req.params.namespace, options);
      const next = {
        ...options,
        offset: options.offset + options.limit,
      };
      res.send({ results, options, next });
    } catch (error) {
      console.error(error);
      res.status(500).send({ successful: false, error: error.message });
    }
  });

  app.get(toRoute('/:namespace/__count'), async (req, res) => {
    try {
      const namespace = req.params.namespace;
      const ns = await jaas.ns(namespace);
      res.send({ namespace, total: await ns.count() });
    } catch (error) {
      console.error(error);
      res.status(500).send({ successful: false, error: error.message });
    }
  });

  app.get(toRoute('/:namespace/:key'), async (req, res) => {
    try {
      const namespace = req.params.namespace;
      const ns = await jaas.ns(namespace);
      const key = req.params.key;
      const value = (await ns.get(key)) || null;
      res.send({ key, value });
    } catch (error) {
      console.error(error);
      res.status(500).send({ successful: false, error: error.message });
    }
  });

  app.put(toRoute('/:namespace/:key', 'PUT'), async (req, res) => {
    const { body: value } = req;
    try {
      const namespace = req.params.namespace;
      const ns = await jaas.ns(namespace);
      const key = req.params.key;
      await ns.put(key, value);
      res.send({ key, value });
    } catch (error) {
      console.error(error);
      res.status(500).send({ successful: false, error: error.message });
    }
  });

  app.delete(toRoute('/:namespace', 'DELETE'), async (req, res) => {
    try {
      const namespace = req.params.namespace;
      const ns = await jaas.ns(namespace);
      await ns.truncate(req.params.namespace);
      res.send({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).send({ successful: false, error: error.message });
    }
  });

  app.delete(toRoute('/:namespace/:key', 'DELETE'), async (req, res) => {
    try {
      const namespace = req.params.namespace;
      const ns = await jaas.ns(namespace);
      const key = req.params.key;
      const value = (await ns.remove(key)) || null;
      res.send({ key, value });
    } catch (error) {
      console.error(error);
      res.status(500).send({ successful: false, error: error.message });
    }
  });
}

module.exports = {
  init,
};
