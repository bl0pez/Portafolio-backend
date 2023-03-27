const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

const connectDB = require('./db/config');

const app = express();

//Middlewares
app.use(express.static(path.resolve(__dirname, '../', 'public')));

app.use(cors());

// Parse JSON
app.use(express.json());

//Conect to DB
connectDB();

// Settings
app.set('port', process.env.PORT || 3000);


// Routes
app.use('/api', require('./routes/seed'));
app.use('/api', require('./routes/github'));

//Si no encuentra ninguna ruta
app.use((req, res, next) => {
    res.status(404).json({
        ok: false,
        msg: 'Ruta no encontrada'
    });
});



app.listen(app.get('port'), () => {
    console.log('Server on port', 'http://localhost:' + app.get('port') + '/ ');
});

module.exports = app;