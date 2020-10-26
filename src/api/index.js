const express = require('express');
const cors = require('cors');
const apikeyAuth = require('./apikeyMiddleware');
const collectionRoutes = require('./collectionRoutes.js');
const infoRoutes = require('./infoRoutes.js');

function init(app) {
  app.use(express.json());
  app.use(cors());
  app.use(apikeyAuth());

  collectionRoutes.init(app);
  infoRoutes.init(app);
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
