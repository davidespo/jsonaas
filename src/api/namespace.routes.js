const { jaas } = require('../db');

const VERSION_SLUG = `v1`;
const SLUG = `ns`;

const toRoute = (relativePath, method = 'GET') => {
  const path = `/${VERSION_SLUG}/${SLUG}${relativePath}`;
  console.log(`Registering ${method} ${path}`);
  return path;
};

function init(app) {
  let path = toRoute('/');
  app.get(path, async (req, res) => {
    try {
      res.send(await jaas.all());
    } catch (error) {
      console.error(error);
      res.status(500).send({ successful: false, error: error.message });
    }
  });

  app.get(toRoute('/:namespace'), async (req, res) => {
    try {
      res.send(await jaas.meta(req.params.namespace));
    } catch (error) {
      console.error(error);
      res.status(500).send({ successful: false, error: error.message });
    }
  });

  app.put(toRoute('/:namespace', 'PUT'), async (req, res) => {
    try {
      const { body: meta } = req;
      res.send(await jaas.updateNs(req.params.namespace, meta));
    } catch (error) {
      console.error(error);
      res.status(500).send({ successful: false, error: error.message });
    }
  });
}

module.exports = {
  init,
};
