import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AISApiService } from '../../services/aisapi.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tess',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tess.component.html',
  styleUrl: './tess.component.scss',
})
export class TessComponent implements OnInit, OnDestroy {
  private messageSubscription!: Subscription;

  constructor(private webSocketService: AISApiService) {}

  ngOnInit(): void {
    this.messageSubscription = this.webSocketService.message$.subscribe(
      (event) => {
        console.log('Received message:', event.data);
        // Handle the received message here
      }
    );
  }

  ngOnDestroy(): void {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
    // this.webSocketService.close();
  }
}
