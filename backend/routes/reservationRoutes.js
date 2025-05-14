// routes/reservationRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../midlleware/authMiddleware'); // Vérifie également le chemin de ce fichier

const { reserverTrajet } = require('../controllers/reserverTrajet.js');

router.post('/reserver', auth, reserverTrajet);


module.exports = router;
