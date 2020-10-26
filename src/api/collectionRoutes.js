const { count, get, list, put, remove, truncate } = require('../db/index.js');

function init(app) {
  app.get('/v1/:namespace', async (req, res) => {
    res.send(
      await list(
        req.params.namespace,
        parseInt(req.query.limit),
        parseInt(req.query.offset),
      ),
    );
  });

  app.get('/v1/:namespace/__count', async (req, res) => {
    res.send(await count(req.params.namespace));
  });

  app.get('/v1/:namespace/__info', (req, res) => {
    // TODO:
    res.send(INFO);
  });

  app.get('/v1/:namespace/:key', async (req, res) => {
    res.send(await get(req.params.namespace, req.params.key));
  });

  app.post('/v1/:namespace', async (req, res) => {
    const {
      body: { key, value },
    } = req;
    res.send(await put(req.params.namespace, key, value));
  });

  app.delete('/v1/:namespace', async (req, res) => {
    res.send(await truncate(req.params.namespace));
  });

  app.delete('/v1/:namespace/:key', async (req, res) => {
    res.send(await remove(req.params.namespace, req.params.key));
  });
}

module.exports = {
  init,
};
