import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { CommonModule } from '@angular/common';
import { FirebaseAuthComponent } from './components/firebase-auth/firebase-auth.component';
import { ToastComponent } from './components/toast/toast.component';
import { ConfirmationDialogComponent } from './components/conformation-dialog/confirmation-dialog.component';

@Component({
  selector: 'ono-flight-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    MatSidenavModule,
    SidenavComponent,
    CommonModule,
    FirebaseAuthComponent,
    ToastComponent,
    ConfirmationDialogComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
})
export class AppComponent {}
