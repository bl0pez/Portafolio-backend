const { Router } = require('express');
const { getGithub, sendEmail } = require('../controllers/github');

const router = Router();

router.get('/portafolio', getGithub);

//Ruta enviar correo
router.post('/send-email', sendEmail);



module.exports = router;