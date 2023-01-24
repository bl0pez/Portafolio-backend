const Github = require('../models/Github');

const getGithub = async(req, res) => {
    try {

        const data = await Github.find();

        //Devolvemos los que tengan la etiqueta "frontend" y "backend"

        const [frontend, backend ] = await Promise.all([
            data.filter( item => item.topics.includes('frontend')),
            data.filter( item => item.topics.includes('backend'))
        ]);

        res.status(200).json({
            ok: true,
            frontend,
            backend,
        });

        
    } catch (error) {
        res.status(500).json({
            ok:false,
            error: error.message
        });
    }
}

module.exports = {
    getGithub
}