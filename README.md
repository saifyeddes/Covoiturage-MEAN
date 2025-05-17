Site Web de Covoiturage (MEAN Stack)
Un plateforme conviviale pour organiser et partager des trajets en covoiturage, avec interfaces séparées pour les conducteurs, passagers et administrateurs.

Fonctionnalités
Interface Administrateur
Gérer conducteurs, passagers, véhicules et trajets
Modifier ou supprimer des informations
Gestion globale du système
Interface Conducteur
Poster de nouveaux trajets
Gérer ses véhicules
Consulter et répondre aux avis des passagers
Interface Passager
Consulter trajets et conducteurs disponibles
Réserver un trajet
Laisser des avis sur les conducteurs
Technologies utilisées
MongoDB (base de données NoSQL)
Express.js (framework serveur backend)
Angular (framework frontend)
Node.js (serveur runtime)
Bootstrap + Font Awesome (pour une interface attrayante et iconisée)

1. Cloner le dépôt
bash
git clone https://github.com/votre-username/covoiturage-MEAN.git
cd covoiturage-mean
2. Installer les dépendances Backend
bash
cd backend
npm install
3. Configurer la Base de Données
Modifier config.js pour connecter à votre instance MongoDB (locale ou cloud, comme Atlas)
Importer vos données initiales si besoin
4. Lancer le Serveur Backend
bash
node app.js
# ou en mode développement avec nodemon
npx nodemon app.js
5. Installer les dépendances Frontend
bash
cd ../frontend
npm install
6. Lancer l’Application Angular
bash
ng serve
# puis ouvrir http://localhost:4200
7. Accéder aux interfaces
Admin : http://localhost:4200/admin (ajustez selon votre routing)
Conducteur : http://localhost:4200/driver
Passager : http://localhost:4200/passenger
Conseils pour une interface attractive
Utiliser Bootstrap pour des composants modernes et responsives
Ajouter icônes Font Awesome pour représenter les actions (recherche, voiture, utilisateur, étoile pour avis)
Utiliser des couleurs cohérentes pour différencier les rôles
Créer une page d'accueil attrayante avec bannière et navigation claire
Exemple d’icônes à utiliser
🚗 pour véhicules
🧳 pour trajets
⭐ pour avis
📝 pour ajout/modification
🔍 pour recherche
Contribution et Support
Pour tout besoin d’aide, suggestions ou contributions, contactez-moi ou ouvrez une issue.

