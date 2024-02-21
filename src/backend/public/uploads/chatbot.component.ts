// src/app/chatbot/chatbot.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  message: string = '';

  toggleChatBox() {
    const chatBox = document.getElementById('chat-box');
    if (chatBox) {
      chatBox.style.display = (chatBox.style.display === 'none' || chatBox.style.display === '') ? 'block' : 'none';
    }
  }

  sendMessage() {
    const chatInput = document.getElementById('chat-input') as HTMLInputElement;
    const message = chatInput.value.trim();

    if (message !== '') {
      const chatBoxBody = document.getElementById('chat-box-body');
      if (chatBoxBody) {
        const newMessage = document.createElement('div');
        newMessage.textContent = message;
        chatBoxBody.appendChild(newMessage);

        // Clear input
        chatInput.value = '';

        // Scroll to the bottom
        chatBoxBody.scrollTop = chatBoxBody.scrollHeight;
      }
    }
  }
}
