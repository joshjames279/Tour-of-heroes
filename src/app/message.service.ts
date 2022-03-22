import { Injectable } from '@angular/core';
import { MessageModule } from 'primeng/message';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: MessageModule[] = [];

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}
