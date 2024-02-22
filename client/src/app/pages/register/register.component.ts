import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

interface Model {
  username: string;
  password: string;
  email: string;
  passwordC: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private api: ApiService, private auth: AuthService, private router: Router) {}

  error: string;

  async register(model: Model) {
    this.error = "";

    const { success, error } = await this.api.post("register", {
      username: model.username,
      password: model.password,
      email: model.email
    });
  
    if (error) {
      this.error = error;
      return;
    }

    if (success) {
      this.auth.username = model.username;
      this.router.navigate(["/"])
    }
  }
}
