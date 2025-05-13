import { Component } from '@angular/core';
import { ChatGPTService } from '../services/chatgpt.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatgpt',
  templateUrl: './chatgpt.component.html',
  imports: [CommonModule, FormsModule ],
  styleUrls: ['./chatgpt.component.css']
})
export class ChatgptComponent {
  userInput = '';
  messages: { from: 'user' | 'bot', text: string }[] = [];

  constructor(private chatService: ChatGPTService) {}

  sendMessage() {
    if (!this.userInput.trim()) return;

    const userMessage = this.userInput;
    this.messages.push({ from: 'user', text: userMessage });

    this.chatService.sendMessage(userMessage).subscribe({
      next: (res) => {
        const reply = res.choices[0].message.content;
        this.messages.push({ from: 'bot', text: reply });
      },
      error: (err) => {
        console.error(err);
        this.messages.push({ from: 'bot', text: 'Erreur lors de la réponse du serveur.' });
      }
    });

    this.userInput = '';
  }
}
