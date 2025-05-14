// models/reservation.js
const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  trajet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trajet',
    required: true
  },
  passager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  nbPlaces: {
    type: Number,
    required: true,
    min: 1
  },
  statut: {
    type: String,
    enum: ['en_attente', 'confirmee', 'annulee'],
    default: 'en_attente'
  },
  dateReservation: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Reservation', reservationSchema);
