import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { RouterModule } from '@angular/router';
import { PostDto } from '../../dto/post.dto';
import { PostService } from '../../services/post.service';
import { MockPostService } from '../../services-mock/mock-post.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, CarouselModule, TagModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  featuredEpisodes: PostDto[] = [];
  recentEpisodes: PostDto[] = [];
  loading = true;

  constructor(
    private postService: PostService,
    private mockPostService: MockPostService
  ) { }

  ngOnInit() {
    this.loadEpisodes();
  }

  private loadEpisodes() {
    const service = environment.mock ? this.mockPostService : this.postService;

    service.getPosts({ take: 6, skip: 0 }).subscribe({
      next: (result) => {
        const episodes = result.items.map(item => item.item);
        this.featuredEpisodes = episodes.slice(0, 3); // First 3 for hero carousel
        this.recentEpisodes = episodes.slice(3, 6); // Next 3 for recent section
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading episodes:', error);
        this.loading = false;
      }
    });
  }

  getEpisodeImage(episode: PostDto): string {
    return episode.image || '/images/E1.png'; // Default fallback
  }

  getEpisodeDate(episode: PostDto): string {
    if (episode.publishedDate) {
      return new Date(episode.publishedDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    if (episode.createdAt) {
      return new Date(episode.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    return 'Coming Soon';
  }

  openYouTubeLink(link: string) {
    if (link) {
      window.open(link, '_blank');
    }
  }
}
