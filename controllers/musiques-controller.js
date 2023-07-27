


const Musique = require('../models/musique')

const HttpError = require('../utils/http-errors')

const getMusiques = async (req, res, next) => {
    //res.json({ MUSIQUES });
    let musiques;
    try{
        musiques = await Musique.find();
    } catch(err) {
        //console.log({err})
        const error = new HttpError('Erreur lors de la récupération de la liste', 500);
        return next (error)
}
res.json({musiques: musiques.map(m => m.toObject({getters: true}))})
};

const getMusiqueById = async (req, res, next) => {

    const mId = req.params.musiqueid;
    //console.log({ mId })
    
    let musique;

    try{
        musique = await Musique.findById(mId);
    }catch(err){
        const error = new HttpError('Erreur lors de la récupération de la musique', 500);
        return next (error)
    }


    if (!musique) {
        const error = new HttpError('Musique non trouvée pour cet ID', 404);
        return next(error)
    };

    res.json({ musique: musique.toObject({getters: true}) })
}


const createMusique = async (req, res, next) => {

    const {auteur, annee, titre, imageUrl, detail} = req.body;

    const createdMusique = new Musique ({
        auteur,
        annee,
        titre,
        imageUrl,
        detail
    });

    //MUSIQUES.push(createdMusique);
    try{
        await createdMusique.save();
    } catch(err) {
        const error = new HttpError('Erreur lors de l\'enregistrement de la musique', 500);
        return next (error)
}

    res.status(201).json({createdMusique})

};

const updateMusique = async (req, res, next) => {

    const {auteur, annee, titre, imageUrl, detail} = req.body;

    const mId = req.params.musiqueid;

    let musique;

    try {
        musique= await Musique.findById(mId);
    } catch (err) {
        const error = new HttpError('Erreur lors de la mise à jour de la musique', 500);
        return next (error)
    }

    musique.auteur = auteur;
    musique.annee = annee;
    musique.titre = titre;
    musique.imageUrl = imageUrl;
    musique.detail = detail;

    try {
        await musique.save();
    } catch (err) {
        const error = new HttpError('Les modifications de la musique n\'ont pas été enregistrées, veuillez recommencer.', 500);
        return next (error)
    }

    res.status(200).json({musique: musique.toObject({getters:true})});


};


const deleteMusique = async (req, res, next) => {
    const mId = req.params.musiqueid;
    let musique;

    try {
        musique = await Musique.findById(mId);
    } catch (err) {
        const error = new HttpError('Erreur lors de la suppression de la musique', 500);
        return next (error)
    }

    if(!musique){
        const error = new HttpError('Aucune musique n\'a été trouvée', 404);
        return next (error)
    }

    try {
        await musique.remove()
    } catch (err) {
        const error = new HttpError('La suppression de la musique n\'a pas fonctionné, veuillez recommencer.', 404);
        return next (error)
    }

    //MUSIQUES = MUSIQUES.filter((m) => m.id !== mId);

    res.status(200).json("Musique supprimée !")

}


exports.getMusiques = getMusiques;
exports.getMusiqueById = getMusiqueById;
exports.createMusique = createMusique;
exports.updateMusique = updateMusique;
exports.deleteMusique = deleteMusique;