import {Component, OnDestroy, OnInit} from '@angular/core';
import {Room} from '../../models/room.model';
import {RoomService} from '../../services/room.service';
import {Subscription} from 'rxjs';
import {MatDialog} from "@angular/material/dialog";
import {RoomFormComponent} from "./room-form/room-form.component";

@Component({
    selector: 'app-room',
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit, OnDestroy {
    displayedColumns: string[] = ['roomId', 'name', 'bookingEmail', 'sitting', 'currentStatus', 'actions'];
    public rooms: Room[] = [];
    public roomFetcheEvent: Subscription;

    constructor(public roomService: RoomService, public dialog: MatDialog) {
        this.roomFetcheEvent = this.roomService.roomFetchEvent.subscribe((rooms: Room[]) => {
            this.rooms = rooms;
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
            data: room
        });
    }


    ngOnDestroy(): void {
        this.roomFetcheEvent.unsubscribe();
    }

}
