export class Room {
    id: number;
    roomId: string;
    name: string;
    bookingEmail: string;
    sitting: string;
    currentStatus: string;

    constructor(room: {
        id: number,
        room_id: string,
        name: string,
        booking_email: string,
        sitting: string,
        current_status: string
    }) {
        this.id = room.id;
        this.roomId = room.room_id;
        this.name = room.name;
        this.bookingEmail = room.booking_email;
        this.sitting = room.sitting;
        this.currentStatus = room.current_status;
    }
}
