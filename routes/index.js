const express = require('express');
const auth = require('../auth');
const router = express.Router();

// Home page
router.get('/', async (req, res) => {
  const { userContext } = req;
  if (!!userContext) {
     // ToDo: This should be reusable, try putting back in app.js
    res.locals.user  = await auth.oktaClient.getUser(userContext.userinfo.sub);
  }
  res.render('index');
});


module.exports = router;
