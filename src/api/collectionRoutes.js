const { count, get, list, put, remove, truncate } = require('../db/index.js');

const VERSION_SLUG = `v1`;
const NAMESPACE_SLUG = `ns`;

const nsRoute = (relativePath) =>
  `/${VERSION_SLUG}/${NAMESPACE_SLUG}${relativePath}`;

const safe = (func, res) => {
  try {
    func();
  } catch (error) {
    console.error(error);
    res.status(500).send({ successful: false, error: error.message });
  }
};

function init(app) {
  app.get(nsRoute('/:namespace'), async (req, res) => {
    try {
      res.send(
        await list(
          req.params.namespace,
          parseInt(req.query.limit),
          parseInt(req.query.offset),
        ),
      );
    } catch (error) {
      console.error(error);
      res.status(500).send({ successful: false, error: error.message });
    }
  });

  app.get(nsRoute('/:namespace/__count'), async (req, res) => {
    try {
      res.send(await count(req.params.namespace));
    } catch (error) {
      console.error(error);
      res.status(500).send({ successful: false, error: error.message });
    }
  });

  app.get(nsRoute('/:namespace/__info'), (req, res) => {
    // TODO:
    res.send(INFO);
  });

  app.get(nsRoute('/:namespace/:key'), async (req, res) => {
    try {
      res.send(await get(req.params.namespace, req.params.key));
    } catch (error) {
      console.error(error);
      res.status(500).send({ successful: false, error: error.message });
    }
  });

  app.post(nsRoute('/:namespace'), async (req, res) => {
    const {
      body: { key, value },
    } = req;
    try {
      res.send(await put(req.params.namespace, key, value));
    } catch (error) {
      console.error(error);
      res.status(500).send({ successful: false, error: error.message });
    }
  });

  app.delete(nsRoute('/:namespace'), async (req, res) => {
    try {
      res.send(await truncate(req.params.namespace));
    } catch (error) {
      console.error(error);
      res.status(500).send({ successful: false, error: error.message });
    }
  });

  app.delete(nsRoute('/:namespace/:key'), async (req, res) => {
    try {
      res.send(await remove(req.params.namespace, req.params.key));
    } catch (error) {
      console.error(error);
      res.status(500).send({ successful: false, error: error.message });
    }
  });
}

module.exports = {
  init,
};
