const express = require('express');
const auth = require('../auth');
const router = express.Router();

// Home page
router.get('/', async (req, res) => {
  // const { userContext } = req; // ToDo: Remove
  res.render('index');
});


module.exports = router;
