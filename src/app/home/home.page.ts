import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  constructor() {}

  async ngOnInit() {
    console.log('init');
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 'testUser2' }),
    };
    try {
      const res = await fetch(
        // 'http://localhost:3000/api/v1/subscribe',
        'https://chh-push-notification-production.up.railway.app/api/v1/subscribe',
        options
      );
      const token = await res.json();
      console.log(token);

      const ws = new WebSocket(token.url);

      ws.onmessage = function (e) {
        const serverMessage = e.data;
        console.log(serverMessage);
      };
    } catch (err) {
      console.error(err);
    }
  }
}
