import {Injectable} from '@angular/core';
import {Room} from '../models/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  public rooms: Room[] | undefined;

  constructor() {
  }
}
