import { Component, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotService } from '../../services/chatbot.service';

interface ChatMessage {
  text: string;
  isUser: boolean;
  suggestions?: string[];
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="chatbot-container" [class.open]="isOpen">
      <div class="chatbot-header" (click)="toggleChat()">
        <span>Assistant Covoiturage</span>
        <button class="toggle-btn">
          {{ isOpen ? '−' : '+' }}
        </button>
      </div>
      <div class="chatbot-messages" #messageContainer>
        <div *ngFor="let message of messages" 
             [class.user-message]="message.isUser"
             [class.bot-message]="!message.isUser"
             class="message">
          <div [innerHTML]="formatMessage(message.text)"></div>
          <div *ngIf="message.suggestions && !message.isUser" class="suggestions">
            <button *ngFor="let suggestion of message.suggestions"
                    (click)="useSuggestion(suggestion)"
                    class="suggestion-btn">
              {{ suggestion }}
            </button>
          </div>
        </div>
      </div>
      <div class="chatbot-input">
        <input type="text" 
               [(ngModel)]="currentMessage" 
               (keyup.enter)="sendMessage()"
               placeholder="Posez votre question ou choisissez une suggestion..."
               [disabled]="!isOpen">
        <button (click)="sendMessage()" [disabled]="!isOpen || !currentMessage.trim()">
          Envoyer
        </button>
      </div>
    </div>
  `,
  styles: [`
    :host {
      --primary-color: #4CAF50;
      --secondary-color: #E3F2FD;
      --text-color: #333;
      --border-color: #ddd;
      --shadow-color: rgba(0, 0, 0, 0.1);
    }
    .chatbot-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 300px;
      background: white;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      z-index: 1000;
      max-height: 500px;
      transition: max-height 0.3s ease-in-out;
    }

    .chatbot-container:not(.open) {
      max-height: 50px;
    }

    .chatbot-header {
      background: #4CAF50;
      color: white;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
    }

    .toggle-btn {
      background: none;
      border: none;
      color: white;
      font-size: 20px;
      cursor: pointer;
    }

    .chatbot-messages {
      flex-grow: 1;
      overflow-y: auto;
      padding: 10px;
      max-height: 400px;
    }

    .message {
      margin: 8px;
      padding: 12px;
      border-radius: 15px;
      max-width: 85%;
      word-wrap: break-word;
    }

    .suggestions {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 8px;
    }

    .suggestion-btn {
      background: var(--secondary-color);
      border: 1px solid var(--border-color);
      border-radius: 20px;
      padding: 6px 12px;
      font-size: 0.9em;
      cursor: pointer;
      transition: all 0.2s ease;
      white-space: nowrap;
    }

    .suggestion-btn:hover {
      background: var(--primary-color);
      color: white;
      transform: translateY(-1px);
    }

    .user-message {
      background: #E3F2FD;
      margin-left: auto;
    }

    .bot-message {
      background: #F5F5F5;
      margin-right: auto;
    }

    .chatbot-input {
      display: flex;
      padding: 10px;
      border-top: 1px solid #eee;
    }

    .chatbot-input input {
      flex-grow: 1;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      margin-right: 5px;
    }

    .chatbot-input button {
      padding: 8px 15px;
      background: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .chatbot-input button:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  `]
})
export class ChatbotComponent implements AfterViewChecked {
  @ViewChild('messageContainer') private messageContainer!: ElementRef;
  
  isOpen = false;
  currentMessage = '';
  messages: ChatMessage[] = [];

  constructor(private chatbotService: ChatbotService) {
    // Message de bienvenue
    this.chatbotService.processMessage('bonjour').subscribe(message => {
      this.addMessage(message);
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      const element = this.messageContainer.nativeElement;
      element.scrollTop = element.scrollHeight;
    } catch (err) {}
  }

  toggleChat(): void {
    this.isOpen = !this.isOpen;
  }

  sendMessage(): void {
    if (this.currentMessage.trim() === '') return;

    // Ajouter le message de l'utilisateur
    this.addMessage({ text: this.currentMessage, isUser: true });

    // Obtenir la réponse du chatbot
    this.chatbotService.processMessage(this.currentMessage)
      .subscribe(response => {
        this.addMessage(response);
      });

    // Réinitialiser le message courant
    this.currentMessage = '';
  }

  private addMessage(message: ChatMessage): void {
    this.messages.push(message);
    this.chatbotService.addMessage(message);
  }

  useSuggestion(suggestion: string): void {
    this.currentMessage = suggestion;
    this.sendMessage();
  }

  formatMessage(text: string): string {
    return text.replace(/\n/g, '<br>');
  }
}
