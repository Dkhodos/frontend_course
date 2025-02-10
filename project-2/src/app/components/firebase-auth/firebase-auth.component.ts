import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { animate, style, transition, trigger } from '@angular/animations';
import { LoaderComponent } from '../loader/loader.component';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environment';

@Component({
  selector: 'ono-flight-firebase-auth',
  templateUrl: './firebase-auth.component.html',
  styleUrls: ['./firebase-auth.component.scss'],
  standalone: true,
  imports: [LoaderComponent, CommonModule],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('500ms ease-out', style({ opacity: 0 }))]),
    ]),
  ],
})
export class FirebaseAuthComponent implements OnInit {
  loading = true;

  constructor(private auth: Auth) {}

  async ngOnInit() {
    try {
      await signInWithEmailAndPassword(
        this.auth,
        environment.firebase.admin.email,
        environment.firebase.admin.password!
      );
      console.log('Login successful');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      this.loading = false; // Hide loader when login completes
    }
  }
}
