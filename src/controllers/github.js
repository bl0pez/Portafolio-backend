const nodeMailer = require('nodemailer');
const Github = require('../models/Github');

const getGithub = async (req, res) => {
    try {
        const data = await Github.find();

        res.status(200).json({
            ok: true,
            data,
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            error: error.message
        });
    }
}


const sendEmail = async (req, res) => {
    try {

        const { name, email, message } = req.body;

        // Validar que todos los campos estén llenos
        if (!name || !email || !message) {
            return res.status(400).json({
                ok: false,
                msg: 'Todos los campos son obligatorios'
            });
        }

        // Validar que el email sea válido
        const regex = /\S+@\S+\.\S+/;
        if (!regex.test(email)) {
            return res.status(400).json({
                ok: false,
                msg: 'El email no es válido'
            });
        }

        const transporter = nodeMailer.createTransport({
            service: 'gmail',
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: '"Portafolio" <',
            to: process.env.EMAIL_USER,
            subject: 'Contacto desde el portafolio',
            text: 'Hola, tienes un nuevo mensaje',
            html: `
                <h1>Información del contacto</h1>
                <ul>
                    <li>Nombre: ${name}</li>
                    <li>Email: ${email}</li>
                </ul>
                <p>${message}</p>
            `
        });

        res.status(200).json({
            ok: true,
            msg: 'Mensaje enviado correctamente'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            error: error.message
        });
    }
}

module.exports = {
    getGithub,
    sendEmail
}