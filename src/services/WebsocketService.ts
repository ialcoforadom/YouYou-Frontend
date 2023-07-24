import Stomp from 'webstomp-client';

const baseUrl = process.env.WEB_SOCKET_BASE_URL || '';

export default class WebSocketService {
  private stompClient: any;
  private webSocket: WebSocket;

  constructor() {
    this.webSocket = new WebSocket(baseUrl);
    this.stompClient = Stomp.over(this.webSocket, { debug: false });
  }

  connect(url: string, callback: (arg: any) => void) {
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe(url, (data: any) => {
        callback(data);
      });
    });
  }

  disconnect() {
    this.stompClient.disconnect();
  }
}
