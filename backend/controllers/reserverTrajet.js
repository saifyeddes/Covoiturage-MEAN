// controllers/reservationController.js
const Reservation = require('../models/Reservation');
const Trajet = require('../models/trajet');

// Dans ton contrôleur
exports.reserverTrajet = async (req, res) => {
  try {
    const { trajetId, nbPlaces } = req.body;
    const userId = req.userId; // Auth middleware doit injecter `userId`

    // Vérifier que le trajet existe
    const trajet = await Trajet.findById(trajetId);
    if (!trajet) {
      return res.status(404).json({ message: 'Trajet introuvable' });
    }

    // Vérifier qu’il reste assez de places
    const reservationsExistantes = await Reservation.aggregate([
      { $match: { trajet: trajet._id, statut: { $ne: 'annulee' } } },
      { $group: { _id: null, total: { $sum: "$nbPlaces" } } }
    ]);

    const placesDejaReservees = reservationsExistantes[0]?.total || 0;
    const placesRestantes = trajet.passagers - placesDejaReservees;

    if (nbPlaces > placesRestantes) {
      return res.status(400).json({ message: `Il ne reste que ${placesRestantes} place(s)` });
    }

    // Créer la réservation
    const reservation = new Reservation({
      trajet: trajet._id,
      passager: userId,
      nbPlaces
    });

    await reservation.save();

    res.status(201).json({
      message: '✅ Réservation effectuée avec succès',
      reservation
    });

  } catch (error) {
    console.error('Erreur réservation :', error.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
