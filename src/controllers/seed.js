const axios = require('axios');
const Github = require('../models/Github');

const seed = async (req, res) => {

    try {
        //Solicitud a la api de github
        // const response = await fetch('https://api.github.com/users/bl0pez/subscriptions', {
        //     headers: {
        //         'Authorization': `token ${process.env.GITHUB_TOKEN}`
        //     }
        // }); //https://api.github.com/users/bl0pez/subscriptions
        //https://api.github.com/users/bl0pez/repos

        // const response1 = await fetch('https://api.github.com/users/bl0pez/repos');
        // const response2 = await fetch('https://api.github.com/users/bl0pez/subscriptions');

        //Limpiamos la base de datos
        await Github.deleteMany();

        const [response1, response2] = await Promise.all([
            axios.get('https://api.github.com/users/bl0pez/repos'),
            axios.get('https://api.github.com/users/bl0pez/subscriptions')
            // fetch('https://api.github.com/users/bl0pez/repos'),
            // fetch('https://api.github.com/users/bl0pez/subscriptions')
        ]);

        const [githubData1, githubData2] = await Promise.all([
            response1.data,
            response2.data
        ]);

        //devuelva los repositorios una sola ves y no se repitan
        const githubData = githubData1.concat(githubData2.filter((item) => {
            return !githubData1.some((item2) => {
                return item2.id === item.id;
            });
        }));


        //Array
        const repos = [];

        githubData.forEach(({
            name,
            description,
            html_url,
            topics,
            homepage,
        }) => {

            const imageURL = `https://raw.githubusercontent.com/bl0pez/${name}/master/preview.png`;
            const imageUrlDefault = "https://raw.githubusercontent.com/bl0pez/Portafolio-backend/master/preview.webp"

            //Agregamos solo los que tengan la etiqueta frontend y backend
            if (topics.includes('frontend') || topics.includes('backend') || homepage !== null) {
                repos.push({
                    name,
                    description,
                    html_url,
                    image: image ? imageURL : imageUrlDefault,
                    topics,
                    homepage,
                });
            }

        });

        await Github.insertMany(repos);

        res.status(200).json({
            ok: true,
            msg: "Data saved",
            total: repos.length
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error"
        })
    }

}


module.exports = {
    seed
}