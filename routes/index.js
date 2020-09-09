const express = require('express');
const auth = require('../auth');
const router = express.Router();

// Home page
router.get('/', (req, res) => {
  const { userContext } = req;
  if (!!userContext) {
    // ToDo: This is a hack, it isn't async and it should be reusable
    res.locals.user = auth.oktaClient.getUser(userContext.userinfo.sub);
  }
  res.render('index');
});


module.exports = router;
