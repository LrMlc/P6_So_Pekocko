
// IMPORTATIONS
const mongoose = require('mongoose'); // on importe mongoose
const uniqueValidator = require('mongoose-unique-validator')/* récupération du package qui gère la propriété 'unique' pour éviter qu'un adresse mail soit partager par plusieurs utilisateurs*/

/* création du schéma*/
const userSchema = mongoose.Schema({
    // mongodb attribut lui même une id à l'utilisateur au moment de la connexion
    email: { type: String, required: true, unique: true}, /* 'unique' pour qu'il soit impossible qu'on puisse s'inscrire plusieurs fois avec la même adresse mail*/
    password: { type: String, required: true}
});

/* on applique le validator au schéma avant d'en faire un model*/
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model ('User', userSchema);
