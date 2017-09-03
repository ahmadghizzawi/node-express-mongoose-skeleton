const express = require('express');

const router = express.Router();

/* API landing. */
router.get('/', (req, res) => {
  res.json('Hello!');
});

module.exports = router;
