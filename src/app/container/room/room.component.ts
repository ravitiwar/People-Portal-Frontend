import {Component, OnDestroy, OnInit} from '@angular/core';
import {Room} from '../../models/room.model';
import {RoomService} from '../../services/room.service';
import {Subscription} from 'rxjs';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {RoomFormComponent} from './room-form/room-form.component';
import {AuthService} from '../../services/auth.service';
import {User} from '../../services/user.model';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['roomId', 'name', 'bookingEmail', 'sitting', 'currentStatus'];
  public rooms: Room[] = [];
  public roomFetcheEvent: Subscription;
  public loginEvent: Subscription;

  constructor(public roomService: RoomService, public dialog: MatDialog, public authService: AuthService) {
    this.roomFetcheEvent = this.roomService.roomFetchEvent.subscribe((rooms: Room[]) => {
      this.rooms = rooms;
    });

    this.loginEvent = this.authService.userLogin.subscribe((user: User) => {
      if (this.authService.userCan('conf_room_edit') || this.authService.userCan('conf_room_delete')) {
        this.displayedColumns.push('actions');
      }
    });
  }

  ngOnInit(): void {
    this.roomService.getRooms();
  }

  addRoom(): void {
    this.openDialog(new Room({
      id: 0,
      room_id: '',
      name: '',
      booking_email: '',
      sitting: '',
      current_status: ''
    }));
  }

  editRoom(room: Room): void {
    this.openDialog(room);
  }

  deleteRoom(room: Room): void {
    if (confirm('Are you sure ?')) {
      this.roomService.deleteRoom(room);
    }
  }

  private openDialog(room: Room): void {
    this.dialog.open(RoomFormComponent, {
      data: {...room}
    });
  }


  ngOnDestroy(): void {
    this.roomFetcheEvent.unsubscribe();
    this.loginEvent.unsubscribe();
  }

}
