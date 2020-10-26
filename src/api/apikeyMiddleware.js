const { nanoid } = require('nanoid');

const ADMIN_KEY = process.env.ADMIN_KEY || nanoid(44);
console.log(`ADMIN_KEY=${ADMIN_KEY}`);
const WRITE_KEY = process.env.WRITE_KEY;
const READ_KEY = process.env.READ_KEY;

function apikeyAuth(req, res, next) {
  const qKey = req.query['apikey'];
  if (qKey === ADMIN_KEY) {
    next();
    return;
  } else {
    switch (req.method) {
      case 'OPTION':
      case 'GET': {
        if (!READ_KEY || READ_KEY === qKey) {
          next();
          return;
        }
      }
      default: {
        if (!WRITE_KEY || WRITE_KEY === qKey) {
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
