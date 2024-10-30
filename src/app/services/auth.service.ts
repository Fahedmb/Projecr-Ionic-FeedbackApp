import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }

  async signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  async signIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async signOut() {
    return this.auth.signOut();
  }

  getCurrentUser() {
    return this.auth.currentUser;
  }

}
