/* logique de routing*/
const express = require('express'); // récupération d'express pour la création d'un routeur
const router = express.Router(); // création du routeur
const userCTRL = require('../controllers/user'); // récupération du controleur user

// ROUTE
/*création de 2 routes*/
router.post('/signup', userCTRL.signup); /* Post car le frontend va aussi envoyer des informations, l'adresse mail et le mot de passe*/
router.post('/login', userCTRL.login);

// EXPORT
module.exports = router;