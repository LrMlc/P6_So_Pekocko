/* Création d'un programme qui va écouter, qui attend des requêtes HTTP et qui va y répondre.
Pour ceci il faut importer le package HTTP de node */


const http = require('http'); // importation du package http de node,donne accès à l'objet http qui permet de créer un serveur
const app = require('./app');// importation de l'application express

// NORMALIZE PORT
/* la fonction normalizePort renvoie un port valide soit sous fomre de numéro soit sous forme de chaîne*/
const normalizePort = val =>{
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}; 
const port = normalizePort(process.env.PORT || '3000'); // par défaut on utilise le port 3000
app.set('port', port); // assignation du port à l'application express

// ERROHANDLER
/* la fonction errorHandler recherche et gère les différentes erreurs*/
const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const adress = server.address();
    const bind = typeof address === 'string' ? 'pipe' + adress : 'port: ' + port;
    switch (error.code){
        case 'EACCES':
            console.error(bind + 'requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind = ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;

    }
};

/* Création du serveur, l'appllication express est passé à notre serveur*/
const server= http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe' + adress : 'port' + port;
    console.log('Listening on' + bind);
});

/* configuration du serveur sur le port 3000*/
server.listen(port);