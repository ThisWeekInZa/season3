import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { PostService } from '../../services/post.service';
import { PostDto } from '../../dto/post.dto';
import { QueryOptions } from '../common-dto/query.dto';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    CardModule,
    TooltipModule,
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnInit {
  latestEpisode: PostDto | null = null;
  loading = true;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.loadLatestEpisode();
  }

  private loadLatestEpisode() {
    const queryOptions: QueryOptions = {
      take: 1,
      skip: 0,
    };

    this.postService.getPosts(queryOptions).subscribe({
      next: (result) => {
        if (result.items && result.items.length > 0) {
          this.latestEpisode = result.items[0].item;
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading latest episode:', error);
        this.loading = false;
      },
    });
  }

  watchEpisode() {
    if (this.latestEpisode?.youTubeLink) {
      window.open(this.latestEpisode.youTubeLink, '_blank');
    }
  }

  getEpisodeImage(): string {
    return this.latestEpisode?.image || '/images/hero.png';
  }
}
