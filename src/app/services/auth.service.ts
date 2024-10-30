import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from '@angular/fire/auth';
import { getFirestore, doc, setDoc, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private firestore = getFirestore();

  constructor(private auth: Auth) { }

  async signUp(email: string, password: string, role: string): Promise<UserCredential> {
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    const user = userCredential.user;
    // Add user document to Firestore with role attribute
    await setDoc(doc(this.firestore, `users/${user.uid}`), {
      email: user.email,
      role: role
    });
    console.log('User registered with role:', role);
    return userCredential;
  }

  async signIn(email: string, password: string): Promise<UserCredential> {
    try {
      return await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      console.error('Error during sign-in:', error);
      throw error;
    }
  }

  async signOut(): Promise<void> {
    return this.auth.signOut();
  }

  getCurrentUser() {
    return this.auth.currentUser;
  }

  async getUserRole(uid: string): Promise<string> {
    console.log('Fetching user role for UID:', uid);
    const userDoc = doc(this.firestore, `users/${uid}`);
    const userSnapshot = await getDoc(userDoc);
    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      console.log('User data:', userData);
      return userData['role']; // Access 'role' using bracket notation
    } else {
      console.error('User not found in Firestore for UID:', uid);
      throw new Error('User not found');
    }
  }
}
