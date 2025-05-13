const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Charge les variables d'environnement

const authRoutes = require('./routes/authRoutes'); // Importation des routes d'authentification
const trajetRoutes = require('./routes/trajetRoutes');
const chatRoutes = require('./routes/chatRoutes'); // ChatGPT route

const app = express(); // <-- cette ligne doit être avant les `app.use(...)`

// Middleware
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json()); // Pour analyser les corps de requêtes JSON

// Routes
app.use('/api/auth', authRoutes); // Exemple : POST /api/auth/login
app.use('/api/trajets', trajetRoutes);
app.use('/api/chat', chatRoutes); // <-- maintenant c’est au bon endroit

// Vérifie que l'URI MongoDB est bien présente
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.error("❌ MONGO_URI est manquant dans le fichier .env");
  process.exit(1);
}

// Connexion à MongoDB
mongoose.connect(mongoUri)
  .then(() => console.log('✅ MongoDB connecté'))
  .catch((err) => {
    console.error('❌ Erreur de connexion à MongoDB :', err);
    process.exit(1);
  });

// Démarrage du serveur
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Serveur lancé sur le port ${port}`);
});
