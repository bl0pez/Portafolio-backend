const Github = require('../models/Github');

const seed = async(req, res) => {

        try {
        //Solicitud a la api de github
        const response = await fetch('https://api.github.com/users/bl0pez/subscriptions');
        const githubData = await response.json();

        //Limpiamos la base de datos
        await Github.deleteMany();

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

                //Agregamos solo los que tengan la etiqueta frontend y backend
                if(!topics.includes('frontend') && !topics.includes('backend')) return;


                repos.push({
                    name,
                    description,
                    html_url,
                    image: imageURL,
                    topics,
                    homepage,
                });
        });

        await Github.insertMany(repos);

        res.status(200).json({
            ok: true,
            msg: "Data saved"
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