import { Injectable } from '@angular/core';
import {ChatMessageDto} from "../modals/chat-message-dto";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  webSocket: WebSocket | undefined;
  chatMessages: ChatMessageDto[] = [];

  constructor() {
  }

  public openWebSocket() {
    this.webSocket = new WebSocket('ws://localhost:8080/chat');
    this.webSocket.onopen = (event) => {
      console.log('Open: ', event);
    }

    this.webSocket.onmessage = (event) => {
      const chatMessageDto = JSON.parse(event.data);
      this.chatMessages.push(chatMessageDto);
    };

    this.webSocket.onclose = (event) => {
      console.log('Close: ', event);
    };
  }

  public sendMessage(chatMessageDto: ChatMessageDto) {
    // @ts-ignore
    this.webSocket.send(JSON.stringify(chatMessageDto));
  }

  public closeWebSocket() {
    // @ts-ignore
    this.webSocket.close();
  }

}
