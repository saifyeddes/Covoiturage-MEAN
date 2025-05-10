const mongoose = require('mongoose');
const Trajet = require('../models/trajet');

const moment = require('moment');
const nlpManager = require('../nlpManager'); 

exports.publierTrajet = async (req, res) => {
  try {
    const { depart, arrivee, passagers, dateDepart, dateArrivee } = req.body;
    const userId = req.userId;

    function addOneHour(dateStr) {
      return moment(dateStr, 'YYYY-MM-DD HH:mm').add(1, 'hours').toDate();
    }
    
    const trajet = new Trajet({
      conducteur: userId,
      depart,
      arrivee,
      passagers,
      dateDepart: addOneHour(dateDepart),
      dateArrivee: addOneHour(dateArrivee)
    });

    await trajet.save();

    res.status(201).json({
      message: '✅ Trajet publié avec succès',
      trajet
    });
  } catch (err) {
    console.error("Erreur lors de la publication du trajet :", err.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
exports.rechercherTrajet = async (req, res) => {
  try {
    const { requete, filtres } = req.body;

    const response = await nlpManager.process('fr', requete);
    console.log('Entités extraites:', response.entities);

    const villeDepart = response.entities.find((e) => e.entity === 'villeDepart')?.option;
    const villeArrivee = response.entities.find((e) => e.entity === 'villeArrivee')?.option;

    if (!villeDepart || !villeArrivee) {
      return res.status(400).json({ message: 'Veuillez préciser à la fois la ville de départ et la ville d\'arrivée.' });
    }

    const tri = filtres?.tri;
    const heureDepart = filtres?.heureDepart;

    // Création de la requête MongoDB de base
    const query = {
      depart: { $regex: new RegExp(villeDepart, 'i') },
      arrivee: { $regex: new RegExp(villeArrivee, 'i') }
    };

    // Filtrage par tranche horaire (si définie)
    if (heureDepart) {
      const baseDate = moment().add(1, 'days').startOf('day');
      let dateCondition = {};

      switch (heureDepart) {
        case 'avant06:00':
          dateCondition = { $lt: baseDate.clone().hour(6).toDate() };
          break;
        case '06:00-12:00':
          dateCondition = {
            $gte: baseDate.clone().hour(6).toDate(),
            $lt: baseDate.clone().hour(12).toDate()
          };
          break;
        case '12:01-18:00':
          dateCondition = {
            $gte: baseDate.clone().hour(12).minute(1).toDate(),
            $lt: baseDate.clone().hour(18).toDate()
          };
          break;
        case 'apres18:00':
          dateCondition = { $gte: baseDate.clone().hour(18).toDate() };
          break;
      }

      query.dateDepart = dateCondition;
    }

    // Tri selon le filtre
    let sortOption = {};
    switch (tri) {
      case 'departPlusTot':
        sortOption = { dateDepart: 1 };
        break;
      case 'prixPlusBas':
        sortOption = { prix: 1 }; // Assure-toi d'avoir ajouté un champ prix dans le modèle
        break;
      default:
        sortOption = {};
    }

    // Exécution de la requête
    const trajets = await Trajet.find(query).sort(sortOption);

    if (trajets.length === 0) {
      console.log('Aucun trajet trouvé de', villeDepart, 'à', villeArrivee);
    }

    res.status(200).json({ trajets });

  } catch (err) {
    console.error('Erreur lors de la recherche de trajet:', err.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
exports.getAllTrajets = async (req, res) => {
  try {
    const today = new Date();
    const midnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const trajets = await Trajet.find({
      dateDepart: { $gte: midnight }
    }).sort({ dateDepart: 1 });

    res.status(200).json({ trajets });
  } catch (err) {
    console.error('Erreur lors de la récupération des trajets:', err.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};



