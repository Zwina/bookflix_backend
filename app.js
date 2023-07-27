
var express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

require('dotenv').config();

const HttpError = require("./utils/http-errors")
const cors = require('cors');


const musiquesRoutes = require('./routes/musiques-routes')
const filmsRoutes = require('./routes/films-routes')
const livresRoutes = require('./routes/livres-routes')
const usersRoutes = require('./routes/users-routes')

var corsOptions = {
    origin:'*',
}

const app = express();
app.use(cors());
app.use(bodyParser.json())



app.use('/api/musiques', musiquesRoutes);
app.use('/api/films', filmsRoutes);
app.use('/api/livres', livresRoutes);
app.use('/api/users', usersRoutes);

app.use((req, res, next) =>{
const error = new HttpError('Page non trouvée', 404);
        return next (error)})

app.use((error, req, res, next)=>{
    if(res.headerSent){
        return next (error)
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'Une erreur non gérée est suvenue'})
})


const uri = process.env.URL_DATABASE

mongoose.set('strictQuery', true)


mongoose.connect(uri)
    .then(() => {
        //app.listen(5000), 
        app.listen(process.env.PORT||"5000");
        console.log("Server running");
    })
    .catch(err => {
        console.log(err);
    })



