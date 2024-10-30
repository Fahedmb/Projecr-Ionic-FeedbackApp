import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, query, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private roomsCollection = collection(this.firestore, 'rooms');
  private reactionsCollection = collection(this.firestore, 'reactions');

  constructor(private firestore: Firestore) { }

  async createRoom(presenterId: string, roomName: string): Promise<void> {
    await addDoc(this.roomsCollection, {
      presenterId,
      roomName,
      createdAt: new Date()
    });
  }

  async getRooms(): Promise<any[]> {
    const querySnapshot = await getDocs(this.roomsCollection);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async addReaction(roomId: string, userId: string, reaction: string): Promise<void> {
    await addDoc(this.reactionsCollection, {
      roomId,
      userId,
      reaction,
      timestamp: new Date()
    });
  }
}
