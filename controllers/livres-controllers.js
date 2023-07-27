
/*let LIVRES = [
    {
        id : "1",
        auteur : "Ray Bradbury",
        annee : "1953",
        titre : "Fahrenheit 451",
        imageUrl : "https://upload.wikimedia.org/wikipedia/commons/b/bf/FAHRENHEIT_451_by_Ray_Bradbury%2C_Corgi_1957._160_pages._Cover_by_John_Richards.jpg",
        detail : "451 degrés Fahrenheit représentent la température à laquelle un livre s'enflamme et se consume.Dans cette société future où la lecture, source de questionnement et de réflexion, est considérée comme un acte antisocial, un corps spécial de pompiers est chargé de brûler tous les livres, dont la détention est interdite pour le bien collectif.Montag, le pompier pyromane, se met pourtant à rêver d'un monde différent, qui ne bannirait pas la littérature et l'imaginaire au profit d'un bonheur immédiatement consommable. Il devient dès lors un dangereux criminel, impitoyablement poursuivi par une société qui désavoue son passé."

    },
    {
      id : "2",
      auteur : "René Barjavel",
      annee : "1968",
      titre : "La nuit des temps",
      imageUrl : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD",
      detail : "Dans l'immense paysage gelé, les membres des Expéditions Polaires françaises font un relevé sous-glaciaire. Un incroyable phénomène se produit : les appareils sondeurs enregistrent un signal. Il y a un émetteur sous la glace... Que vont découvrir les savants et les techniciens venus du monde entier qui creusent la glace à la rencontre du mystère ? La nuit des temps, c'est à la fois un reportage, une épopée mêlant présent et futur, et un grand chant d'amour passionné. Traversant le drame universel comme un trait de feu, le destin d'Elea et de Païkan les emmène vers le grand mythe des amants légendaires."

  },
  {
    id : "3",
    auteur : "Robert Silverberg",
    annee : "1972",
    titre : "L'homme programmé",
    imageUrl : "rr",
    detail : "Paul Macy sort juste du Centre de Réhabilitation. Bien sûr, il est encore un peu perturbé, mais très bientôt sa vie reprendra son cours normal. Un nouvel appartement, un nouveau travail l'attendent, et il ne lui faudra pas longtemps avant de se faire de nouveaux amis. Paul habite l'ancien corps de Nat Hamlin, un sculpteur de génie, mais aussi un violeur en série de la pire espèce. La personnalité, les souvenirs d'Hamlin ont été effacés de manière définitive pour faire place au passé créé de toutes pièces de Macy. La société peut désormais dormir sur ses deux oreilles. Mais quelle est donc cette voix que Paul entend de plus en plus souvent à l'intérieur de son crâne? Roman de science-fiction sombre et violent, L'homme programmé fait écho à L'oreille interne, publié à la même époque. Une nouvelle preuve de l'immense talent de l'auteur."
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


const Livre = require('../models/livre')

const HttpError = require('../utils/http-errors')

    
const getLivres = async (req, res, next) => {
  let livres;
  try{
      livres = await Livre.find();
  } catch(err) {
    const error = new HttpError('Erreur lors de la récupération de la liste', 500);
    return next (error)
}
res.json({livres: livres.map(l => l.toObject({getters: true}))})
};

const getLivreById = async (req, res, next) => {

    const lId = req.params.livreid;

    //console.log({ lId })
    let livre;

    try {
      livre = await Livre.findById(lId);
    } catch (err) {
      const error = new HttpError('Erreur lors de la récupération du livre', 500);
      return next (error)
    }

    if (!livre) {
      const error = new HttpError('Livre non trouvé pour cet ID', 404);
      return next(error)
    };

    res.json({ livre: livre.toObject({getters: true}) })
}

const createLivre = async (req, res, next) => {

  const {auteur, annee, titre, imageUrl, detail} = req.body;

  const createdLivre = new Livre ({
      auteur,
      annee,
      titre,
      imageUrl,
      detail
  });


  try{
    await createdLivre.save();
} catch(err) {
  const error = new HttpError('Erreur lors de l\'enregistrement du livre', 500);
  return next (error)
}

  res.status(201).json({createdLivre})

};


const updateLivre = async (req, res, next) => {

  const {auteur, annee, titre, imageUrl, detail} = req.body;
  const lId = req.params.livreid;

  let livre;

  try {
    livre= await Livre.findById(lId);
} catch (err) {
  const error = new HttpError('Erreur lors de la mise à jour du livre', 500);
  return next (error)
}

livre.auteur = auteur;
livre.annee = annee;
livre.titre = titre;
livre.imageUrl = imageUrl;
livre.detail = detail;

try {
    await livre.save();
} catch (err) {
  const error = new HttpError('Les modifications du livre n\'ont pas été enregistrées, veuillez recommencer.', 500);
  return next (error)
}

res.status(200).json({livre: livre.toObject({getters:true})});

};

const deleteLivre = async (req, res, next) => {
  const lId = req.params.livreid;
  let livre;

  try {
      livre = await Livre.findById(lId);
  } catch (err) {
    const error = new HttpError('Erreur lors de la suppression du livre', 500);
        return next (error)
  }

  if(!livre){
    const error = new HttpError('Aucun livre n\'a été trouvé', 404);
    return next (error)
  }

  try {
      await livre.remove()
  } catch (err) {
    const error = new HttpError('La suppression du livre n\'a pas fonctionné, veuillez recommencer.', 404);
    return next (error)
  }

  res.status(200).json("Livre supprimé !")

}


exports.getLivres = getLivres;
exports.getLivreById = getLivreById;
exports.createLivre = createLivre;
exports.updateLivre = updateLivre;
exports.deleteLivre = deleteLivre;