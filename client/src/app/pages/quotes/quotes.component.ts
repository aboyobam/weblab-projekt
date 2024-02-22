import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { MarkdownModule } from 'ngx-markdown';
import { RateModuleComponent } from '../../misc/rate-module/rate-module.component';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-quotes',
  standalone: true,
  imports: [RouterLink, CommonModule, MarkdownModule, NgbCollapseModule, RateModuleComponent],
  templateUrl: './quotes.component.html',
  styleUrl: './quotes.component.scss'
})
export class QuotesComponent {
  constructor(public auth: AuthService, private api: ApiService) {}

  modules: any[] = [];

  async ngOnInit() {
    const res = await this.api.get("quotes");
    if (!res.success) {
      alert(res.error);
      return;
    }

    this.modules = res.modules;
  }
}
