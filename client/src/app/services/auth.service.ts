import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(api: ApiService) {
    api.get("user").then(({ success, username }) => {
      if (success) {
        this.username = username;
      }
    });
  }

  username: string;
}
