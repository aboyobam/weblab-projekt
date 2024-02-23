import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RateModuleComponent } from '../../misc/rate-module/rate-module.component';
import { ApiService } from '../../services/api.service';
import { RouterLink } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RateModuleComponent, RouterLink, MarkdownModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  modules: any[];
  quotes: any[];
  articles: any[];

  constructor(private api: ApiService) {}

  async ngOnInit() {
    const { modules, quotes, articles, error, success } = await this.api.get("trending");
    if (error) {
      alert(error);
      return;
    }

    if (success) {
      this.modules = modules;
      this.quotes = quotes;
      this.articles = articles;
    }
  }
}
