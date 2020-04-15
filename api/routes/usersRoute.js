const userRoute = require('express').Router();

function router() {
  userRoute.route('/')
    .get((req, res) => {
      res.send('user router');
    });

  return userRoute;
}

module.exports = router;
