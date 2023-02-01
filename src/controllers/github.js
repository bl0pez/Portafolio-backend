const Github = require('../models/Github');

const getGithub = async(req, res) => {
    try {
        const data = await Github.find();

            // const frontend = data.filter( item => item.topics.includes('frontend'));
            // const backend = data.filter( item => item.topics.includes('backend'));


        res.status(200).json({
            ok: true,
            data,
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            error: error.message
        });
    }
}

module.exports = {
    getGithub
}