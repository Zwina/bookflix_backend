

/*let FILMS = [
    {
        id : "1",
        auteur : "Tonino Valerii",
        annee : "1973",
        titre : "Mon nom est Personne",
        imageUrl : "https://www.filmspourenfants.net/wp-content/uploads/2020/09/mon-nom-est-personne-a-366x500.jpg",
        detail : "blabla blabla blabla blabla"

    },
    {
      id : "2",
      auteur : "Enzo Barboni",
      annee : "1970",
      titre : "On l'appelle Trinita",
      imageUrl : "https://www.rueducine.com/wp-content/uploads/2013/08/rueducine.com-on-l-appelle-trinita-1970.jpg"

  },
  {
    id : "3",
    auteur : "Enzo Barboni",
    annee : "1971",
    titre : "On continue à l'appeler Trinita",
    imageUrl : "https://www.intemporel.com/wp-content/uploads/89336.jpg"

},
{
  id : "4",
  auteur : "Daft Punk",
  annee : "2013",
  titre : "Get lucky",
  imageUrl : "https://m.media-amazon.com/images/I/61cjEm5meDL._SL1500_.jpg"

},
{
  id : "5",
  auteur : "Daft Punk",
  annee : "2013",
  titre : "Get lucky",
  imageUrl : "https://m.media-amazon.com/images/I/61cjEm5meDL._SL1500_.jpg"

},
{
  id : "6",
  auteur : "Daft Punk",
  annee : "2013",
  titre : "Get lucky",
  imageUrl : "https://m.media-amazon.com/images/I/61cjEm5meDL._SL1500_.jpg"

},
{
  id : "7",
  auteur : "Daft Punk",
  annee : "2013",
  titre : "Get lucky",
  imageUrl : "https://m.media-amazon.com/images/I/61cjEm5meDL._SL1500_.jpg"

},
{
  id : "8",
  auteur : "Daft Punk",
  annee : "2013",
  titre : "Get lucky",
  imageUrl : "https://m.media-amazon.com/images/I/61cjEm5meDL._SL1500_.jpg"

}


]*/



//const mongoose = require('mongoose')

const Film = require('../models/film')

const HttpError = require('../utils/http-errors')

const getFilms = async (req, res, next) => {
  let films;
  try{
    films = await Film.find();
  } catch(err) {
    const error = new HttpError('Erreur lors de la récupération de la liste', 500);
    return next (error)
}
res.json({films: films.map(f => f.toObject({getters: true}))})
};

const getFilmById = async (req, res, next) => {

    const fId = req.params.filmid;

    //console.log({ fId })

    try {
      film = await Film.findById(fId);
    } catch (err) {
      const error = new HttpError('Erreur lors de la récupération du film', 500);
      return next (error)
    }
    

    if (!film) {
      const error = new HttpError('Film non trouvé pour cet ID', 404);
      return next(error)
    };

    res.json({ film: musique.toObject({getters: true}) })
}

const createFilm = async (req, res, next) => {

  const {auteur, annee, titre, imageUrl, detail} = req.body;

  const createdFilm = new Film ({
      auteur,
      annee,
      titre,
      imageUrl,
      detail
  });

  //FILMS.push(createdFilm);

  try{
    await createdFilm.save();
} catch(err) {
  const error = new HttpError('Erreur lors de l\'enregistrement du film', 500);
        return next (error)
}

  res.status(201).json({createdFilm})

};

const updateFilm = async (req, res, next) => {

  const {auteur, annee, titre, imageUrl, detail} = req.body;
  const fId = req.params.filmid;

  let film;

  try {
    film= await Film.findById(fId);
} catch (err) {
  const error = new HttpError('Erreur lors de la mise à jour du film', 500);
        return next (error)
}

film.auteur = auteur;
film.annee = annee;
film.titre = titre;
film.imageUrl = imageUrl;
film.detail = detail;

try {
    await film.save();
} catch (err) {
  const error = new HttpError('Les modifications du film n\'ont pas été enregistrées, veuillez recommencer.', 500);
        return next (error)
}

res.status(200).json({film: film.toObject({getters:true})});



};


const deleteFilm = async (req, res, next) => {
  const fId = req.params.filmid;
  let film;

  try {
      film = await Film.findById(fId);
  } catch (err) {
    const error = new HttpError('Erreur lors de la suppression du film', 500);
        return next (error)
  }

  if(!film){
    const error = new HttpError('Aucun film n\'a été trouvé', 404);
        return next (error)
  }

  try {
      await film.remove()
  } catch (err) {
    const error = new HttpError('La suppression du film n\'a pas fonctionné, veuillez recommencer.', 404);
    return next (error)
  }

  res.status(200).json("Film supprimé !")

}


exports.getFilms = getFilms;
exports.getFilmById = getFilmById;
exports.createFilm = createFilm;
exports.updateFilm = updateFilm;
exports.deleteFilm = deleteFilm;