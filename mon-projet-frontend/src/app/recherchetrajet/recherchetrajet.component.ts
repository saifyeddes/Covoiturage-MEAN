import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recherchetrajet',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recherchetrajet.component.html',
  styleUrls: ['./recherchetrajet.component.css'],
})
export class RechercheTrajetComponent implements OnInit {
  todayDate: string = new Date().toISOString().split('T')[0];
  searchQuery: string = '';
  passengerCount: number = 1;
  showPassengerDropdown: boolean = false;
  trajets: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getAllTrajets();
  }

  togglePassengerDropdown() {
    this.showPassengerDropdown = !this.showPassengerDropdown;
  }

  handlePassengerDropdownClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.tagName === 'BUTTON' || target.closest('button')) {
      return;
    }
    this.togglePassengerDropdown();
  }

  incrementPassenger(count: number = 1) {
    if (this.passengerCount + count <= 10) {
      this.passengerCount += count;
    } else {
      this.passengerCount = 10;
    }
  }

  decrementPassenger() {
    if (this.passengerCount > 1) {
      this.passengerCount--;
    }
  }

  // 🔹 Appelé lors du clic sur "Rechercher"
  onSearch() {
    if (!this.searchQuery.trim()) {
      this.getAllTrajets(); // Si le champ est vide, on récupère tous les trajets
      return;
    }

    const requestPayload = {
      requete: this.searchQuery,
    };

    this.http.post('http://localhost:5000/api/trajets/rechercher', requestPayload).subscribe(
      (response: any) => {
        console.log('Réponse de la recherche de trajet:', response);
        this.trajets = response.trajets;
      },
      (error) => {
        console.error('Erreur lors de la recherche de trajet:', error);
        alert('Une erreur est survenue. Veuillez réessayer.');
      }
    );
  }

  // 🔹 Récupérer tous les trajets depuis le backend
  getAllTrajets() {
    this.http.get('http://localhost:5000/api/trajets/tous').subscribe(
      (response: any) => {
        console.log('Tous les trajets récupérés:', response);
        this.trajets = response.trajets;
      },
      (error) => {
        console.error('Erreur lors de la récupération des trajets:', error);
      }
    );
  }
}
