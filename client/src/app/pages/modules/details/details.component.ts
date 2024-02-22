import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';
import { MarkdownModule } from 'ngx-markdown';
import { CommonModule } from '@angular/common';
import { RateModuleComponent } from '../../../misc/rate-module/rate-module.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [MarkdownModule, CommonModule, RateModuleComponent, FormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    public auth: AuthService
  ) {}

  commentText: string = "";
  anonymous: boolean = false;
  module: any;

  async addComment() {
    const res = await this.api.post("modules/comment", {
      module: this.module._id,
      text: this.commentText,
      anonymous: this.anonymous
    });
    if (!res.success) {
      alert(res.error);
      return;
    }

    this.module.comments.push(res.comment);
    this.commentText = "";
  }

  async ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    const type = this.route.snapshot.paramMap.get('type');
    if (!slug) {
      this.router.navigate(['/modules']);
      return;
    }

    const { success, error, module } = await this.api.get(`modules/${type}/${slug}`);
    if (error) {
      alert(error);
      this.router.navigate(['/modules']);
    }

    if (success) {
      this.module = module;
    }
  }
}
