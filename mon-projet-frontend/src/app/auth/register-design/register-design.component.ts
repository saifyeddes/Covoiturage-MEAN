import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-design',
  imports: [CommonModule, FormsModule],
  templateUrl: './register-design.component.html',
  styleUrl: './register-design.component.css'
})
export class RegisterDesignComponent {
  user = {
      email: '',
      password: '',
      username:'',
      role: 'passager' // valeur par défaut si tu veux
  
    };
    
  
    constructor(private http: HttpClient) {}
  
    onSubmit() {
      this.http
        .post('http://localhost:5000/api/auth/register', this.user)
        .subscribe({
          next: (res) => {
            console.log('✅ Utilisateur inscrit avec succès', res);
            alert('Inscription réussie !');
          },
          error: (err) => {
            console.error("❌ Erreur lors de l'inscription", err);
            alert('Erreur : ' + (err?.error?.message || 'Inconnue'));
          },
        });
    }
  }
  


