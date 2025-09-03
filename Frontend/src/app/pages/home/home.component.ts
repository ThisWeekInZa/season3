import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { PostService } from '../../services/post.service';
import { PostDto } from '../../dto/post.dto';
import { QueryOptions } from '../../components/common-dto/query.dto';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  latestEpisode: PostDto | null = null;
  loading = true;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.loadLatestEpisode();
  }

  private loadLatestEpisode() {
    const queryOptions: QueryOptions = {
      skip: 0,
      take: 1,
      // Assuming episodes are sorted by date, newest first
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

  getYouTubeEmbedUrl(youTubeLink?: string): string {
    if (!youTubeLink) return '';

    // Extract video ID from various YouTube URL formats
    const videoIdMatch = youTubeLink.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
    );
    const videoId = videoIdMatch ? videoIdMatch[1] : '';

    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
  }
}
