const INFO = { message: 'Hello World!' };

function init(app) {
  app.get('/v1/info', (req, res) => {
    // TODO:
    res.send(INFO);
  });
}

module.exports = {
  init,
};
