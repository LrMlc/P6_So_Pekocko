
// AUTHENTIFICATION
const jwt = require('jsonwebtoken'); // récupération de jwt pour contrôler les tokens

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; /*récuparation du token dans le header autorisation*/
      
        const decodedToken = jwt.verify(token, process.env.jwt_secret);/* on décode le token*/
        const userId = decodedToken.userId; /* récupération du userId*/
        if (req.body.userId && req.body.userId !== userId){ /*vérification que le userId correspond bien a celle du token*/
            throw 'User ID non valable !';
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({ error:'Requête non authentifiée !'});
}
};