import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private api: ApiService, private auth: AuthService) {}

  username: string;
  password: string;
  error: string;

  async login() {
    this.error = "";
    const { success, error } = await this.api.post("login", { username: this.username, password: this.password });

    if (error) {
      this.error = error;
      return;
    }

    if (success) {
      this.auth.username = this.username;
    }
  }
}
