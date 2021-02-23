import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';
import {User} from './user.model';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() {
  }

  public getUrl(endpoint: string): string {
    return 'http://13.233.161.214:81' + endpoint;
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
