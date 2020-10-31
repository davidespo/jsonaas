const { nanoid } = require('nanoid');
const { jaas } = require('../db');

const AUTH_NS = 'internal.auth';

const ADMIN_KEY = 'ADMIN_KEY';
const READ_KEY = 'READ_KEY';
const WRITE_KEY = 'WRITE_KEY';
const keys = {};

async function initApiKey(kind) {
  const ns = await jaas.ns(AUTH_NS);
  let apiKey = process.env[kind];
  if (!!apiKey) {
    await ns.put(kind, apiKey);
  } else {
    apiKey = await ns.get(kind);
    if (!apiKey) {
      apiKey = nanoid(32);
      await ns.put(kind, apiKey);
    }
  }
  console.log(`${kind}=${apiKey}`);
  keys[kind] = apiKey;
  return apiKey;
}

async function initOptionalApiKey(kind) {
  let apiKey = process.env[kind] || null;
  console.log(`${kind}=${apiKey}`);
  keys[kind] = apiKey;
  return apiKey;
}

initApiKey(ADMIN_KEY);
initOptionalApiKey(READ_KEY);
initOptionalApiKey(WRITE_KEY);

function apikeyAuth(req, res, next) {
  const qKey = req.query['apikey'];
  if (qKey === ADMIN_KEY) {
    next();
    return;
  } else {
    switch (req.method) {
      case 'OPTION':
      case 'GET': {
        if (!keys[READ_KEY] || keys[READ_KEY] === qKey) {
          next();
          return;
        }
      }
      default: {
        if (!keys[WRITE_KEY] || keys[WRITE_KEY] === qKey) {
          next();
          return;
        }
      }
    }
  }
  res.status(401).send({
    message: 'Invalid API key',
  });
}

module.exports = () => apikeyAuth;
