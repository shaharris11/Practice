const express = require('express');
const router = express.Router();

const { getPosts} = require('../db/sqlHelperFunctions/posts');

router.get('/', async (req, res, next) => {
  try {
    const posts = await getPost();
    res.send(posts);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
