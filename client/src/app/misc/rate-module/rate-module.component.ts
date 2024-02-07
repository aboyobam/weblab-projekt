import { Component, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'rate-module',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rate-module.component.html',
  styleUrl: './rate-module.component.scss'
})
export class RateModuleComponent {
  constructor(private api: ApiService) {}
  @Input() module: any;

  async rate(module: any, positive: boolean) {
    const res = await this.api.post("modules/rate", { module: module._id, positive });
    if (!res.success) {
      alert(res.error);
      return;
    }

    module.rated = res.rating;
    module.rating = res.newRating;
  }
}
