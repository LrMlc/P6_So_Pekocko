/*importation de mongoose*/
const mongoose = require('mongoose');

/* création d'un schéma de données, d'un model de données qui va permettre de modifier les sauces dans notre base de données*/
const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true}, // id utilisateur qui créé une sauce
    name: { type: String, required: true }, // nom de la sauce
    manufacturer: { type: String, required: true }, // nom du fabricant
    description: { type: String, required: true }, // descrition
    mainPepper: { type: String, required: true }, // ingrédients principaux de la sauce
    imageUrl: { type: String, required: true }, // URL de l'image sauce transféré par l'utilisateur
    heat: { type: Number, required: true }, // piquant de la sauce noté de 1 à 10
    likes: { type: Number, default: 0 }, // nombre d'utilisateur qui aiment la sauce
    dislikes: { type: Number, default: 0 }, // nombre d'utilisateur qui n'aiment pas la sauce
    usersLiked: { type: [String] }, // tableau contenant les id utilisateur aimant la sauce
    usersDisliked: { type: [String] } // tableau contenant les id utilisateur n'aimant pas la sauce
});

/* pour l'exploiter comme model*/
module.exports = mongoose.model('thing', sauceSchema);