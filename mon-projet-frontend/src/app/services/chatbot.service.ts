import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

interface ChatMessage {
  text: string;
  isUser: boolean;
  suggestions?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private messages: ChatMessage[] = [];

  constructor(private http: HttpClient) {}

  // Fonction pour analyser le message et générer une réponse
  processMessage(userMessage: string): Observable<ChatMessage> {
    const lowercaseMsg = userMessage.toLowerCase();
    
    // Messages de bienvenue
    if (lowercaseMsg.includes('bonjour') || lowercaseMsg.includes('salut') || lowercaseMsg.includes('hello')) {
      return of({
        text: 'Bonjour ! Je suis votre assistant de covoiturage. Je peux vous aider à :',
        isUser: false,
        suggestions: [
          '🔍 Rechercher un trajet',
          '🚗 Proposer un trajet',
          '❓ Aide générale'
        ]
      });
    }

    // Recherche de trajet
    if (lowercaseMsg.includes('recherche') || lowercaseMsg.includes('trajet') || lowercaseMsg.includes('cherche')) {
      return of({
        text: 'Pour rechercher un trajet, suivez ces étapes simples :\n' +
             '1. Remplissez le formulaire en haut avec :\n' +
             '   - Votre ville de départ\n' +
             '   - Votre destination\n' +
             '   - La date souhaitée\n' +
             '   - Le nombre de passagers\n' +
             '2. Cliquez sur "Trouver un trajet"\n\n' +
             'Que souhaitez-vous faire ?',
        isUser: false,
        suggestions: [
          '📍 Trajets populaires',
          '📅 Voir les dates disponibles',
          '💰 Voir les prix'
        ]
      });
    }

    // Proposition de trajet
    if (lowercaseMsg.includes('propose') || lowercaseMsg.includes('conducteur') || lowercaseMsg.includes('publier')) {
      return of({
        text: 'Pour proposer un trajet en tant que conducteur :\n' +
             '1. Connectez-vous à votre compte\n' +
             '2. Cliquez sur "Proposer un trajet"\n' +
             '3. Remplissez les détails de votre trajet\n' +
             '4. Définissez votre prix\n\n' +
             'Que voulez-vous savoir ?',
        isUser: false,
        suggestions: [
          '💳 Paiements',
          '⭐ Système de notation',
          '📱 Gérer mes trajets'
        ]
      });
    }

    // Prix et paiements
    if (lowercaseMsg.includes('prix') || lowercaseMsg.includes('tarif') || lowercaseMsg.includes('paiement')) {
      return of({
        text: 'Concernant les prix et paiements :\n' +
             '• Les prix sont fixés par les conducteurs\n' +
             '• Paiement sécurisé en ligne\n' +
             '• Remboursement garanti en cas d\'annulation\n' +
             '• Prix moyens selon la distance :\n' +
             '  - Courts trajets : 5-15€\n' +
             '  - Moyens trajets : 15-30€\n' +
             '  - Longs trajets : 30€+\n\n' +
             'Besoin de plus d\'informations ?',
        isUser: false,
        suggestions: [
          '🔒 Sécurité des paiements',
          '❌ Politique d\'annulation',
          '💡 Conseils pour les prix'
        ]
      });
    }

    // Aide générale
    if (lowercaseMsg.includes('aide') || lowercaseMsg.includes('comment') || lowercaseMsg.includes('fonctionne')) {
      return of({
        text: 'Je peux vous aider avec plusieurs aspects du site :\n' +
             '• Recherche de trajets\n' +
             '• Réservation de places\n' +
             '• Publication d\'annonces\n' +
             '• Système de paiement\n' +
             '• Évaluations et avis\n\n' +
             'Que souhaitez-vous explorer ?',
        isUser: false,
        suggestions: [
          '🔍 Guide de recherche',
          '📝 Guide de réservation',
          '❓ FAQ'
        ]
      });
    }

    // Message par défaut
    return of({
      text: 'Je suis là pour vous guider ! Voici ce que je peux faire pour vous :',
      isUser: false,
      suggestions: [
        '🔍 Rechercher un trajet',
        '🚗 Proposer un trajet',
        '❓ Aide générale'
      ]
    });
  }

  // Ajouter un message à l'historique
  addMessage(message: ChatMessage): void {
    this.messages.push(message);
  }

  // Obtenir l'historique des messages
  getMessages(): ChatMessage[] {
    return this.messages;
  }
}
