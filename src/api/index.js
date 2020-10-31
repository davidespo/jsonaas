const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const apikeyAuth = require('./apikey.middleware');
const routes = [
  require('./data.routes.js'),
  require('./infoRoutes.js'),
  require('./namespace.routes.js'),
];

function init(app) {
  app.use(express.json({ type: '*/*', strict: false }));
  app.use(cors());
  app.use(apikeyAuth());

  routes.forEach((r) => r.init(app));
}

function start() {
  const app = express();
  const port = process.env.PORT || 3000;
  init(app);
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
}

module.exports = { start };
