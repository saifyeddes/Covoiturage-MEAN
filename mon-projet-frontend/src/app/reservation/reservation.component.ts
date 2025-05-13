import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservation',
  imports: [CommonModule],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent {
    trajet: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Récupérer le 'trajet' passé dans l'état
    this.trajet = history.state.trajet;
    if (!this.trajet) {
      // Gérer le cas où aucun trajet n'est passé
      console.error("Aucune information de trajet trouvée !");
    }
  }}
