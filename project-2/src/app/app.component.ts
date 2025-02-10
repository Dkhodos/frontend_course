import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { animate, style, transition, trigger } from '@angular/animations';
import { environment } from '../../environment';
import { LoaderComponent } from './components/loader/loader.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ono-flight-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    MatSidenavModule,
    SidenavComponent,
    LoaderComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
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
export class AppComponent implements OnInit {
  loading = true; // Show loader initially

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
      this.loading = false;
    }
  }
}
