import {EventEmitter, Injectable} from '@angular/core';
import {Room} from '../models/room.model';
import {DataService} from './data.service';
import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class RoomService {
    public rooms: Room[] = [];
    public roomFetchEvent: EventEmitter<any> = new EventEmitter();
    public roomAddEvent: EventEmitter<any> = new EventEmitter();
    public roomUpdateEvent: EventEmitter<any> = new EventEmitter();

    constructor(public dataService: DataService, public authService: AuthService, private http: HttpClient) {
    }

    private setData(data: {
        current_page: number,
        data: [],
        first_page_url: string,
        from: number,
        last_page: number,
        last_page_url: string | null,
        next_page_url: null | string,
        path: string,
        per_page: number,
        prev_page_url: null | string,
        to: number,
        total: number
    }): Room[] {
        this.rooms = [];
        data.data.forEach((room: any) => {
            this.rooms.push(new Room(room));
        });
        return this.rooms;
    }

    public getRooms(): void {
        // tslint:disable-next-line:max-line-length
        this.http.get<Room>(this.dataService.getUrl('/api/conference-room'), {headers: this.authService.getAuthHeaders()}).subscribe((res: any) => {
            if (this.dataService.isResponseSuccess(res)) {
                this.roomFetchEvent.emit(this.setData(this.dataService.getResponseData(res)));
            } else {
                alert('Error While fetching room');
            }
        });
    }

    addRoom(room: Room): void {
        this.http.post<Room>(this.dataService.getUrl('/api/conference-room'), room, {headers: this.authService.getAuthHeaders()}).subscribe((res: any) => {
            if (this.dataService.isResponseSuccess(res)) {
                const _room = new Room(this.dataService.getResponseData(res));
                this.rooms.push(_room);
                this.roomAddEvent.emit(_room);
                this.getRooms();
            } else {
                alert('Error While adding room');
            }
        });
    }

    updateRoom(room: Room): void {
        this.http.put<Room>(this.dataService.getUrl('/api/conference-room/' + room.id), room, {headers: this.authService.getAuthHeaders()}).subscribe((res: any) => {
            if (this.dataService.isResponseSuccess(res)) {
                this.roomUpdateEvent.emit(room);
                this.getRooms();
            } else {
                alert('Error While updating room');
            }
        });
    }

    deleteRoom(room: Room): void {
        this.http.delete<Room>(this.dataService.getUrl('/api/conference-room/' + room.id), {headers: this.authService.getAuthHeaders()}).subscribe((res: any) => {
            if (this.dataService.isResponseSuccess(res)) {
                this.getRooms();
            } else {
                alert('Error While deleting room');
            }
        });
    }


}
