import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { RateModuleComponent } from '../../misc/rate-module/rate-module.component';

@Component({
  selector: 'app-modules',
  standalone: true,
  imports: [RouterLink, CommonModule, MarkdownModule, NgbCollapseModule, RateModuleComponent],
  templateUrl: './modules.component.html',
  styleUrl: './modules.component.scss'
})
export class ModulesComponent implements OnInit {
  constructor(public auth: AuthService, private api: ApiService) {}

  modules: any[] = [];

  async ngOnInit() {
    const res = await this.api.get("modules");
    if (!res.success) {
      alert(res.error);
      return;
    }

    this.modules = res.modules;
  }
}
