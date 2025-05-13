import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatGPTService {
  private apiUrl = 'http://localhost:5000/api/chat';

  constructor(private http: HttpClient) {}

  sendMessage(userMessage: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = {
      messages: [
        { role: 'system', content: 'Tu es un assistant de covoiturage. Aide les utilisateurs à comprendre le fonctionnement du site.' },
        { role: 'user', content: userMessage }
      ]
    };

    return this.http.post(this.apiUrl, body, { headers });
  }
}
