import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, query, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ReactionService {
  private reactionsCollection = collection(this.firestore, 'reactions');

  constructor(private firestore: Firestore) { }

  async addReaction(presentationId: string, userId: string, reaction: string): Promise<void> {
    await addDoc(this.reactionsCollection, {
      presentationId,
      userId,
      reaction,
      timestamp: new Date()
    });
  }

  async getReactions(presentationId: string): Promise<any[]> {
    const q = query(this.reactionsCollection, where('presentationId', '==', presentationId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data());
  }
}
