import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
  }

  public getUrl(endpoint: string): string {
    return 'http://192.168.0.102:8000' + endpoint;
  }

  public getResponseData(response: { success: boolean, data: any, message: string }): any {
    return response.data;
  }

  public isResponseSuccess(response: { success: boolean, data: any, message: string }): boolean {
    return (response.success === undefined) ? false : response.success;
  }

  public getResponseMessage(response: { success: boolean, data: any, message: string }): string {
    return response.message;
  }

}
