const Github = require("../models/Github");

const seed = async(req, res) => {

        try {
        //Solicitud a la api de github
        const response = await fetch('https://api.github.com/users/bl0pez/repos');
        const githubData = await response.json();

        //Limpiamos la base de datos
        await Github.deleteMany();

        //Array de promesas
        const repos = [];

        githubData.forEach(({ 
            name,
            description,
            html_url,
            topics
        }) => {
                
                const imageURL = `https://raw.githubusercontent.com/bl0pez/${name}/master/preview.png`;

                repos.push({
                    name,
                    description,
                    html_url,
                    image: imageURL,
                    topics
                });
        });

        await Github.insertMany(repos);

        res.status(200).json({
            ok: true,
            msg: "Data saved"
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            ok: false,
            msg: "Error"
        })
    }

}


module.exports = {
    seed
}