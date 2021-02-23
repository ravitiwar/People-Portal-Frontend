import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'room'
})
export class RoomCapabilityPipe implements PipeTransform {

  transform(value: [], ...args: unknown[]): Array<string> {
    return this.getOnlyRooms(value);
  }

  protected getOnlyRooms(caps: []): Array<string> {
    return caps.filter((cap: string): boolean => cap.includes('conf_room')).map((cap: string) => cap.replace('conf_room_', ''));
  }

}
