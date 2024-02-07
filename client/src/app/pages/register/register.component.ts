import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private api: ApiService, private auth: AuthService) {}

  username: string;
  password: string;
  email: string;
  passwordConfirm: string;
  error: string;

  async register() {
    this.error = "";

    const { success, error } = await this.api.post("register", { username: this.username, password: this.password, email: this.email });
  
    if (error) {
      this.error = error;
      return;
    }

    if (success) {
      this.auth.username = this.username;
    }
  }

  get canRegister() {
    return this.username && this.password && this.email && this.password === this.passwordConfirm;
  }
}
