import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Room} from '../../../models/room.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RoomService} from '../../../services/room.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-room-form',
    templateUrl: './room-form.component.html',
    styleUrls: ['./room-form.component.css']
})
export class RoomFormComponent implements OnInit, OnDestroy {
    public roomAddEvent: Subscription;
    public roomUpdateEvent: Subscription;

    constructor(@Inject(MAT_DIALOG_DATA) public room: Room, public roomService: RoomService, public dialog: MatDialogRef<RoomFormComponent>,) {
        this.roomAddEvent = this.roomService.roomAddEvent.subscribe((rm: Room) => {
            this.dialog.close();
        });

        this.roomUpdateEvent = this.roomService.roomUpdateEvent.subscribe((rm: Room) => {
            this.dialog.close();
        });
    }

    ngOnInit(): void {
    }

    addRoom(): void {
        this.roomService.addRoom(this.room);
    }

    updateRoom(): void {
        this.roomService.updateRoom(this.room);
    }

    ngOnDestroy(): void {
        this.roomAddEvent.unsubscribe();
        this.roomUpdateEvent.unsubscribe();
    }

}
