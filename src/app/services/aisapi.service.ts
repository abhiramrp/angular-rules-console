import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

if (typeof global !== 'undefined') {
  global.WebSocket = require('ws');
}

@Injectable({
  providedIn: 'root',
})
export class AISApiService {
  private socket: WebSocket;

  public message$ = new Subject<MessageEvent>();

  constructor() {
    this.socket = new WebSocket('wss://stream.aisstream.io/v0/stream');
    this.connect();
  }

  private connect(): void {
    this.socket.onopen = () => {
      const subscriptionMessage = {
        Apikey: 'f00f47cf5e0b0574a8f6e63776d22f95f95bc5f0',
        BoundingBoxes: [
          [
            [-90, -180],
            [90, 180],
          ],
        ],
        FiltersShipMMSI: ['368207620'], // Optional!
        FilterMessageTypes: ['ShipStaticData', 'PositionReport'],
      };
      this.socket?.send(JSON.stringify(subscriptionMessage));
    };

    this.socket.onmessage = (event: MessageEvent) => {
      this.message$.next(event);
    };

    this.socket.onclose = () => {
      console.log('WebSocket connection closed');
      // Optionally, you can add reconnection logic here
    };

    this.socket.onerror = (error: Event) => {
      console.error('WebSocket error:', error);
    };
  }

  public sendMessage(message: any): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    }
  }

  public close(): void {
    this.socket.close();
  }
}
