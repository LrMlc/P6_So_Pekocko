/* création d'un middleware qui configure mutler pour expliquer comment gérer les fichiers, ou les enregistrer
et quels noms leurs donner (la fonctionnalité de téléchargement de fichier*/
 
// importation de MULTER   
const multer = require('multer');

/* création d'un dictonnaire qui est un object */
const MIME_TYPES = {
    'images/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

// objet de configuration pour MULTER
const storage = multer.diskStorage({
    destination: (req, file, callback) => { /* fonction qui explique à multer dans quel dossier enregister les fichiers */
        callback(null, 'images')
    },
    filename: (req, file, callback) => { /* fonction qui explique a multer quel nom de fichier utiliser (éviter le problème que deux fichiers aient le même nom) */
        // génération du nouveau nom
        const name = file.originalname.split(' ').join('_'); /* élimination des white space qui peuvent causer des problèmes côté serveur, on les remplace par des underscores avec la méthode split */
        const extension = MIME_TYPES[file.mimetype]; // utilisation des mime types pour générer l'extension du fichier 
        callback(null, Date.now() + '.' + extension); // création du filename entier = génération d'un nom de fichier unique
    }
});

// exporation du middleware multer
module.exports = multer({ storage }).single('image'); // on explique a multer qu'il sagit de fichier image uniquement