import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent {
  trajet: any;
  nbPlaces: number = 1; // Champ saisi par l'utilisateur

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.trajet = history.state.trajet;
    if (!this.trajet) {
      console.error("Aucune information de trajet trouvée !");
    }
  }

  reserver() {
  const token = localStorage.getItem('token');
  if (!token) {
    alert("Veuillez vous connecter pour réserver.");
    return;
  }

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  const body = {
    trajetId: this.trajet._id,
    nbPlaces: 1 // ou plus si tu ajoutes une saisie
  };

  this.http.post('http://localhost:5000/api/reservations/reserver', body, { headers })
    .subscribe({
      next: (response: any) => {
        alert(response.message || "Réservation effectuée !");
        this.router.navigate(['/mes-reservations']);
      },
      error: (error) => {
        console.error('Erreur lors de la réservation :', error);
        alert(error.error?.message || 'Une erreur est survenue.');
      }
    });
}}