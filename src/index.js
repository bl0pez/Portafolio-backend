const exprees = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db/config');
dotenv.config();

const app = exprees();

//Middlewares
app.use(cors());

//Conect to DB
connectDB();

// Settings
app.set('port', process.env.PORT || 3000);

// Routes
app.use('/api', require('./routes/seed'));


app.listen(app.get('port'), () => {
    console.log('Server on port', 'http://localhost:' + app.get('port') + '/ ');
});