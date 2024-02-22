import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-quote',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new.component.html',
  styleUrl: './new.component.scss'
})
export class NewComponent {
  module: string;
  desc: string;
  anonymous: boolean = false;
  error: string;

  constructor(private api: ApiService, private router: Router) {}

  async publish() {
    this.error = "";
    const { success, error, slug } = await this.api.post('quotes/new', {
      module: this.module,
      desc: this.desc,
      anonymous: this.anonymous
    });

    if (error) {
      this.error = error;
      return;
    }

    if (success) {
      this.router.navigate([`/quote/${slug}`]);
    }
  }
}
