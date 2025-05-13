import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';  // Import Router

@Component({
  selector: 'app-recherchetrajet',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './recherchetrajet.component.html',
  styleUrls: ['./recherchetrajet.component.css'],
})
export class RechercheTrajetComponent implements OnInit {
  todayDate: string = new Date().toISOString().split('T')[0];
  searchQuery: string = '';
  passengerCount: number = 1;
  showPassengerDropdown: boolean = false;
  trajets: any[] = [];

  // Inject Router into the constructor
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.getAllTrajets();
  }

  togglePassengerDropdown() {
    this.showPassengerDropdown = !this.showPassengerDropdown;
  }

  stringify(obj: any): string {
    return JSON.stringify(obj);
  }

  handlePassengerDropdownClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.tagName === 'BUTTON' || target.closest('button')) {
      return;
    }
    this.togglePassengerDropdown();
  }

  reserver(trajet: any) {
    // Navigate to the /reservation page with state
    this.router.navigate(['/reservation'], { state: { trajet } });
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

  // Called on "Rechercher" button click
  onSearch() {
    if (!this.searchQuery.trim()) {
      this.getAllTrajets(); // If search is empty, get all trajets
      return;
    }

    const requestPayload = {
      requete: this.searchQuery,
    };

    this.http.post('http://localhost:5000/api/trajets/rechercher', requestPayload).subscribe(
      (response: any) => {
        console.log('Response from search:', response);
        this.trajets = response.trajets;
      },
      (error) => {
        console.error('Error while searching for trajets:', error);
        alert('An error occurred. Please try again.');
      }
    );
  }

  // Get all trajets from backend
  getAllTrajets() {
    this.http.get('http://localhost:5000/api/trajets/tous').subscribe(
      (response: any) => {
        console.log('All trajets retrieved:', response);
        this.trajets = response.trajets;
      },
      (error) => {
        console.error('Error while retrieving trajets:', error);
      }
    );
  }
}
