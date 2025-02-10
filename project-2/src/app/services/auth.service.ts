import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, UserCredential } from '@angular/fire/auth';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

  async login(): Promise<UserCredential> {
    return signInWithEmailAndPassword(
      this.auth,
      environment.firebase.admin.email,
      environment.firebase.admin.password!
    );
  }

  logout(): Promise<void> {
    return this.auth.signOut();
  }
}
