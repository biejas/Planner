import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable()
export class WebsocketService {

  private socket;

  constructor() { }

  connect(){
    this.socket = io('http://localhost:3000');
    return this.socket;
  }
}
