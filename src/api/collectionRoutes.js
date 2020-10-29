const { count, get, list, put, remove, truncate } = require('../db/index.js');

const VERSION_PREFIX = `/v1`;
const NAMESPACE_PREFIX = `/ns`;

const nsRoute = (relativePath) =>
  `${VERSION_PREFIX}/${NAMESPACE_PREFIX}${relativePath}`;

function init(app) {
  app.get(nsRoute('/:namespace'), async (req, res) => {
    res.send(
      await list(
        req.params.namespace,
        parseInt(req.query.limit),
        parseInt(req.query.offset),
      ),
    );
  });

  app.get(nsRoute('/:namespace/__count'), async (req, res) => {
    res.send(await count(req.params.namespace));
  });

  app.get(nsRoute('/:namespace/__info'), (req, res) => {
    // TODO:
    res.send(INFO);
  });

  app.get(nsRoute('/:namespace/:key'), async (req, res) => {
    res.send(await get(req.params.namespace, req.params.key));
  });

  app.post(nsRoute('/:namespace'), async (req, res) => {
    const {
      body: { key, value },
    } = req;
    res.send(await put(req.params.namespace, key, value));
  });

  app.delete(nsRoute('/:namespace'), async (req, res) => {
    res.send(await truncate(req.params.namespace));
  });

  app.delete(nsRoute('/:namespace/:key'), async (req, res) => {
    res.send(await remove(req.params.namespace, req.params.key));
  });
}

module.exports = {
  init,
};
