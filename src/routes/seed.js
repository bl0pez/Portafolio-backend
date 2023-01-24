const { Router } = require('express');
const { seed } = require('../../controllers/seed');

const router = Router();

router.post('/seed', seed);

module.exports = router;