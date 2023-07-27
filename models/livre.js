const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const livresSchema = new Schema({
    auteur : {type: String, required:true},
    annee : {type: String, required:true},
    titre : {type: String, required:true},
    imageUrl : {type: String, required:true},
    detail : {type: String, required:false}

})

module.exports = mongoose.model('Livre', livresSchema);