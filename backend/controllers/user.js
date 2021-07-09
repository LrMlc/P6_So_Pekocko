// IMPORTATIONS
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

// LOGIQUE METIER
/* fonction asynchrone pour l'enregistrement de nouveaux utilisateurs*/
// SING UP
exports.signup = (req, res, next) => {
    if (req.body.password.lenght < 8) {
        return res.status(400).json({ message: "Votre mot de passe doit contenir au moins 8 caractères ! " })
    } else {
        bcrypt.hash(req.body.password, 10) // hasahge du mot de passe, l'algorithme s'execute 10 pour crypter le mot de passe
            .then(hash => { // récupération du hash du mot de passe
                const user = new User({ // création d'un nouvelle utilisateur
                    email: req.body.email, // enregistrement de l'email dans le paramètre email
                    password: hash // enregistrement du hash dans le paramètre password
                });
                user.save() // la méthode save enregistre l'utilisateur dans la base de donnée
                    .then(() => res.status(201).json({ message: ' Utilisateur créé !' }))/* création de ressourse*/
                    .catch(error => res.status(400).json({ message: ' Cette adresse mail est déjà attribuée ! ' }));
            })
            .catch(error => res.status(500).json({ error }));/* erreur server*/
        } 
    };


/*fonction pour connecter les utilisateurs existants de se connecter à l'application*/
// LOGIN
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }) /* pour trouver un utilisateur de la base de doonnées, qui est unique, pour qui l'adresse mail correspond à l'adresse mail envoyée dans la requête*/
        .then(user => {/* pour vérifier si on a récupérer un user ou non*/
            if (!user) { // si non
                return res.status(401).json({ error: ' Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password) /* si oui, on compare le mot de passe envoyé par l'utilisateur qui essaie de se connecter avec le hash qui est enregistré*/
                .then(valid => { // récéption d'un boolean
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' })
                    }
                    res.status(200).json({ // si il est valide on renvoie un objet json
                        userId: user._id, // l'identifiant
                        token: jwt.sign( /* le token avec 3 arguments: les données que l'on veut encoder, la clé secrète pour l'encodage, la configuration (ici expiration)*/
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => {
                    console.log(error);
                    res.status(500).json({ error: error.message })
                });/* pour un problème de connexion, ou problème lié à mongoDB*/
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: error.message }) // présente un problème de connexion à mongoDB
        });
};