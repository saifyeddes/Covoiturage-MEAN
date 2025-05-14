const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Charge les variables d'environnement

const authRoutes = require('./routes/authRoutes'); // Auth routes
const trajetRoutes = require('./routes/trajetRoutes');
const chatRoutes = require('./routes/chatRoutes');
const reservationRoutes = require('./routes/reservationRoutes'); // Réservations

const app = express(); // ✅ D'abord, on initialise Express

// Middleware
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json()); // Parse les corps JSON

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/trajets', trajetRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/reservations', reservationRoutes); // ✅ Maintenant c’est OK ici

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
