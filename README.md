# P6_So_Pekocko
"Construisez une API sécurisée pour une application d'avis gastronomiques."


OBJECTIF DU PROJET:

Le projet n°6 du parcours Développeur web d'Openclassrooms porte sur le développement d'une application ou les utilisateurs peuvent poster et évaluer des sauces. 
L'objectif est de permettre à chaque utilisateur d’ajouter leurs sauces préférées mais aussi de liker ou disliker les sauces ajoutées par les autres usagers.

OUTILS INDISPENSABLES POUR LE PROJET:
	- Le Framework Express
	- Node JS
	- MongoDB
	- Plug in Mongoose
	- Javascript
	- GIT/Github
	- Visual Studio Code

INSTALLATION DE L'API:

Pour commencer il faut cloner ce projet depuis GITHUB (https://github.com/OpenClassrooms-Student-Center/dwj-projet6).

-> Pour faire tourner le FRONTEND:
Il faut dans un premier temps ouvrir le terminal sur ce dossier et exécuter "npm install" pour installer tout les modules, toutes les dépendances.
Ensuite pour pouvoir faire tourner le serveur de développement sur lequel sera exécuté le code du front-end il faut exécuter "npm install -g @angular/cli".
Enfin dans le terminal exécutez un "ng serve" ou "npm start".
Vous pourrez ensuite ouvrir votre navigateur et vous rendre sur "http://localhost:4200".

-> Pour faire tourner le BACKEND:
Il faut dans un premier temps ouvrir le terminal sur ce dossier puis charger les package en exécutant "npm install" (on installe l'ensemble des outils, des modules présent
tel que nodemon ).
Pour finir on exécute un "npm run dev" pour lancer le server. (comme tout les modules sont installé, ils sont executés)

* avec la commande "ng serve" ou "npm start" via le terminal sur le FRONTEND et la commande "npm run dev" sur le BACKEND, en se connectant à l'URL "http://localhost:4200",
nous avons accès à l'application.


CREER UN FICHIER ".ENV":

Pour plus de sécurité et dans le but de protéger votre base de données, vous devez créer votre fichier ".env". Vous devez le faire dans le répertoire "Root" de l'application. 
Stockez votre clé ( nom d'utilisateur, mot de passe et le json web token) dans des variables pour que le framework puisse la lire.

Exemple: 
	- db_user=identifiant
	- db_pass=monmotdepasse
	- jwt_secret=minusmajusc123

Il faut également ajouter le fichier dans la liste des fichiers à ignorer (".gitignore"= afin que votre clé ne se retrouve pas en ligne.
A noter que pour accéder à votre variable dans le code, vous devez utiliser la notation "process.env." suivie du nom de votre variable.

LIEN DU PROJET 6 : -> https://openclassrooms.com/fr/projects/676/assignment 
