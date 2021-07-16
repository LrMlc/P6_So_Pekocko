/* logique de routing, permet de voir quelles sont les routes disponibles dans notre application,
par le nom des fonction on voit ce que font les routes*/

const express = require('express');// importation d'express
const router = express.Router();// création d'un routeur avec la méthode express
const sauceCtrl = require('../controllers/sauce');// récupération du contrôleur sauce
const auth = require('../middleware/auth');// récupération du middleware d'authentification
const multer = require('../middleware/multer-config');// récupération du middleware gestion fichiers

// ROUTES

/* rajout de middlewares sur les routes qu'on veut protéger*/
// POST
router.post('/', auth, multer, sauceCtrl.createSauce); /* application de la logique métier creaThing (controllers) à la route POST */

// PUT
router.put('/:id', auth, multer, sauceCtrl.modifySauce); /* application de la logique métier modifySauce (controllers) à la route PUT */

// DELETE
router.delete('/:id', auth, sauceCtrl.deleteSauce); /* application de la logique métier deleteSauce (controllers) à la route DELETE */

// GET 
router.get('/:id', auth, sauceCtrl.getOneSauce); /* application de la logique métier getOneSauce (controllers) à la route GET */

// GET 
router.get('/', auth, sauceCtrl.getAllSauces); /* application de la logique métier getAllSauce (controllers) à la route GET */

// POST
router.post('/:id/like', auth, sauceCtrl.likeDislike); /* application de la logique métier postLike (controllers) à la route POST*/

// EXPORT
module.exports = router;