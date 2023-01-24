const { Router } = require('express');
const { getGithub } = require('../controllers/github');

const router = Router();

router.get('/github', getGithub);


module.exports = router;