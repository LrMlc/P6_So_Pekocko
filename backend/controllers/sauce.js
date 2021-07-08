/* ici est stocké la logique pour chaque fonction, stock de toute la logique métiers*/

const { json } = require('body-parser');
const Sauce = require('../models/Sauce'); // récupération du model
const fs = require('fs'); // récupération du package fs de node.js qui gère les fichiers importés

// POST
module.exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce); // extraction de l'objet JSON sous forme de chaîne de caractère
    delete sauceObject._id; // suppression de l'id de sauceOject
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // middleware mutler, on modifie l'URL de l'image, on le génère
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce enregistrée !' }))
        .catch(error => res.status(400).json({ error }));
};

// PUT
module.exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?// si il y a une nouvelle image
        {
            ...JSON.parse(req.body.sauce), // récupération de toute les informations qui font partis de la requête
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // ùpdofocation l'image URL
        } : { ...req.body }; // si il n'y a pas de nouvelle image on traite la requête comme objet directement
    if (req.file) {
        Sauce.findOne({ _id: req.params.id })
            .then(sauce => {
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id }) /*   récupération de l'objet créé et on modifie son identifiant pour correspondre à l'identifiant des paramètres de requête */
                        .then(() => res.status(200).json({ message: 'Sauce modifiée' }))
                        .catch(error => res.status(400).json({ error }));
                });
            }).catch(error => res.status(400).json({ error }))
    } else {
        Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id }) //mise à jour d'une sauce
            .then(() => res.status(200).json({ message: ' Votre sauce a été modifiée' }))
            .catch(error => res.status(400).json({ error }));
    }
};

// DELETE
module.exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id }) // on trouve l'objet dans la base de données
        .then(sauce => { // quand on le trouve on extrait le nom du fichier à supprimer
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => { // on le supprime
                Sauce.deleteOne({ _id: req.params.id }) // on fait la suppression de l'objet dans la base en renvoyant les réponses
                    .then(sauce => res.status(200).json({ message: 'Sauce supprimée' }))
                    .catch(error => res.status(404).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};


// GET
module.exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id }) // récupération d'un seule sauce
        .then((sauce) => res.status(200).json(sauce))
        .catch(error => {
            console.log(error);
            res.status(400).json({ error });
        })
};

// GET
module.exports.getAllSauces = (req, res, next) => {
    Sauce.find() // récupération de la liste de toutes les sauces
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

// POST 
module.exports.likeDislike = (req, res, next) => {
    const like = req.body.like;
    const userId = req.body.userId;


    if (like === 1) { // si l'utilisateur veut le statut like
        Sauce.updateOne( // modification
            { _id: req.params.id },
            {
                $push: { usersLiked: userId }, // ajout de l'userID
                $inc: { likes: 1 }, // on ajout le like
            }
        )
            .then(() => res.status(200).json({ message: ' Like validé ! ' }))
            .catch((error) => res.status(400).json({ error }))
    };

    if (like === -1) { // si l'utilisateur veut le statut dislike
        Sauce.updateOne( // modification
            { _id: req.params.id },
            {
                $push: { userDisliked: userId }, // on ajoute l'userId
                $inc: { dislikes: 1 }, // on ajoute le dislike
            }
        )
            .then(() => res.status(200).json({ message: ' Dislike validé ! ' }))
            .catch((error) => res.status(400).json({ error }));
    };

    if (like === 0) { // si l'utilisateur veut un statut neutre
        Sauce.findOne({ _id: req.params.id }) // récupération de la sauce qui nous intéresse
            .then((sauce) => {
                console.log(sauce);
                if (sauce.usersLiked.includes(req.body.userid)) { // si l'utilisateur aime déjà la sauce
                    Sauce.updateOne( // modification
                        { _id: req.params.id },
                        {
                            $pull: { usersLiked: req.body.userId }, // on efface l'userId
                            $inc: { likes: -1 }, // on supprime le like
                        }
                    )
                        .then(() => res.status(200).json({ message: 'Like annulé ! ' }))

                        .catch((error) => res.status(400).json({ error }))
                }
                if (sauce.usersDisliked.includes(req.body.userId)) { // si l'utilisateur n'aime pas la sauce
                    Sauce.updateOne( // modification
                        { _id: req.params.id },
                        {
                            $pull: { usersDisliked: req.body.userid }, // on efface l'userId
                            $inc: { dislikes: -1 }, // on retir le dislike
                        }
                    )
                        .then(() => res.status(200).json({ message: " Dislike annulé ! " }))
                        .catch((error) => res.status(400).json({ error }))
                }
                else {
                    () => res.status(200).json({ message: ' Votre avis compte, partagez le !' })
                }
            }
            )
            .catch((error) => res.status(404).json({ error }))
    };
}
