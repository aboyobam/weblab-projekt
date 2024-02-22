import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public api: ApiService) {
    api.get("user").then(({ success, username }) => {
      if (success) {
        this.username = username;
      }
    });
  }

  username?: string;

  async logout() {
    const res = await this.api.post("logout", {});
    if (res.success) {
      this.username = undefined;
    }
  }
}
