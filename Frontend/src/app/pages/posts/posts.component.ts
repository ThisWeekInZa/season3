import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { DomSanitizer } from '@angular/platform-browser';
import { QueryResultItem } from '../../components/common-dto/query.dto';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';
import { PostDto } from '../../dto/post.dto';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-episodes',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    CardModule,
    ProgressSpinnerModule,
    PaginatorModule,
    InputTextModule,
    TooltipModule,
  ],
  template: `
    <div class="episodes-container">
      <!-- Header with search -->
      <div class="header">
        <h1>Episodes</h1>
        <div class="search-container">
          <span class="p-input-icon-left">
            <i class="pi pi-search"></i>
            <input
              type="text"
              pInputText
              placeholder="Search episodes..."
              (input)="onSearch($event)"
            />
          </span>
        </div>
      </div>

      <!-- Loading spinner -->
      <div class="spinner-container" *ngIf="loading">
        <p-progressSpinner></p-progressSpinner>
      </div>

      <!-- Error message -->
      <div class="error-message" *ngIf="error">
        <p>{{ error }}</p>
        <button
          pButton
          label="Retry"
          icon="pi pi-refresh"
          (click)="loadEpisodes()"
        ></button>
      </div>

      <!-- Episodes grid -->
      <div class="episodes-grid" *ngIf="!loading && !error">
        <div class="episode-card" *ngFor="let episode of episodes">
          <p-card [style]="{ width: '100%', height: '100%' }">
            <ng-template pTemplate="header">
              <div
                class="thumbnail-container"
                (click)="viewEpisodeDetails(episode.id)"
              >
                <img
                  [src]="getThumbnailUrl(episode.item.youTubeLink!)"
                  alt="Episode thumbnail"
                  class="episode-thumbnail"
                />
                <div class="play-overlay">
                  <i class="pi pi-play-circle"></i>
                </div>
              </div>
            </ng-template>

            <div class="episode-content">
              <h3
                class="episode-title"
                (click)="viewEpisodeDetails(episode.id)"
              >
                {{ episode.item.title }}
              </h3>
              <div class="episode-date">
                {{ episode.item.publishedDate | date : 'mediumDate' }}
              </div>
              <p class="episode-description">
                {{ episode.item.description | slice : 0 : 120
                }}{{ episode.item.description.length > 120 ? '...' : '' }}
              </p>
            </div>

            <ng-template pTemplate="footer">
              <div class="episode-actions">
                <button
                  pButton
                  label="View Details"
                  icon="pi pi-info-circle"
                  class="p-button-outlined"
                  (click)="viewEpisodeDetails(episode.id)"
                ></button>
                <button
                  pButton
                  icon="pi pi-youtube"
                  class="p-button-rounded p-button-danger"
                  pTooltip="Watch on YouTube"
                  tooltipPosition="top"
                  (click)="openYouTubeLink(episode.item.youTubeLink!, $event)"
                ></button>
              </div>
            </ng-template>
          </p-card>
        </div>

        <!-- Empty state -->
        <div class="no-results" *ngIf="episodes.length === 0">
          <i class="pi pi-video" style="font-size: 3rem"></i>
          <h3>No episodes found</h3>
          <p>
            Try different search terms or check back later for new episodes.
          </p>
        </div>
      </div>

      <!-- Pagination -->
      <div
        class="pagination-container"
        *ngIf="!loading && !error && totalRecords > 0"
      >
        <p-paginator
          [rows]="rows"
          [totalRecords]="totalRecords"
          [rowsPerPageOptions]="[6, 12, 24]"
          (onPageChange)="onPageChange($event)"
          [first]="first"
        ></p-paginator>
      </div>
    </div>
  `,
  styles: [
    `
      .episodes-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 1rem;
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
        flex-wrap: wrap;
      }

      h1 {
        margin: 0;
        color: var(--primary-color);
      }

      .search-container {
        min-width: 300px;
        margin: 1rem 0;
      }

      .search-container input {
        width: 100%;
      }

      .spinner-container {
        display: flex;
        justify-content: center;
        padding: 3rem 0;
      }

      .error-message {
        text-align: center;
        padding: 2rem;
        color: var(--error-color, #f44336);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
      }

      .episodes-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1.5rem;
        margin-bottom: 2rem;
      }

      .episode-card {
        height: 100%;
        transition: transform 0.3s ease;
      }

      .episode-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
      }

      .thumbnail-container {
        position: relative;
        overflow: hidden;
        cursor: pointer;
        aspect-ratio: 16/9;
      }

      .episode-thumbnail {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }

      .thumbnail-container:hover .episode-thumbnail {
        transform: scale(1.05);
      }

      .play-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        opacity: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: opacity 0.3s ease;
      }

      .play-overlay i {
        font-size: 4rem;
        color: white;
      }

      .thumbnail-container:hover .play-overlay {
        opacity: 1;
      }

      .episode-content {
        padding: 0.5rem 0;
      }

      .episode-title {
        margin-top: 0;
        margin-bottom: 0.5rem;
        cursor: pointer;
      }

      .episode-title:hover {
        color: var(--primary-color);
      }

      .episode-date {
        font-size: 0.9rem;
        color: #888;
        margin-bottom: 0.5rem;
      }

      .episode-description {
        margin-bottom: 1rem;
        color: #555;
        line-height: 1.5;
      }

      .episode-actions {
        display: flex;
        justify-content: space-between;
        gap: 0.5rem;
      }

      .pagination-container {
        margin-top: 2rem;
        display: flex;
        justify-content: center;
      }

      .no-results {
        grid-column: 1 / -1;
        text-align: center;
        padding: 3rem;
        background-color: #f9f9f9;
        border-radius: 8px;
        color: #666;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
      }

      @media (max-width: 768px) {
        .header {
          flex-direction: column;
          align-items: flex-start;
        }

        .search-container {
          width: 100%;
          margin-top: 1rem;
        }

        .episodes-grid {
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        }
      }

      @media (max-width: 480px) {
        .episodes-grid {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class PostsComponent implements OnInit {
  episodes: QueryResultItem<PostDto>[] = [];
  loading: boolean = true;
  error: string | null = null;

  // Pagination
  totalRecords: number = 0;
  rows: number = 6;
  first: number = 0;

  // Search
  searchTerm: string = '';
  searchTimeout: any;

  constructor(
    private postService: PostService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.loadEpisodes();
  }

  loadEpisodes(searchTerm: string = ''): void {
    this.loading = true;

    const params = {
      skip: this.first,
      take: this.rows,
      filter: searchTerm || undefined,
    };

    this.postService.getPosts(params).subscribe({
      next: (result) => {
        this.episodes = result.items;
        this.totalRecords = result.total;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load episodes';
        this.loading = false;
        console.error('Error loading episodes:', err);
      },
    });
  }

  onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
    this.loadEpisodes(this.searchTerm);
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;

    // Clear previous timeout
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    // Set new timeout to avoid too many API calls while typing
    this.searchTimeout = setTimeout(() => {
      this.searchTerm = value;
      this.first = 0; // Reset to first page when searching
      this.loadEpisodes(value);
    }, 500);
  }

  getYoutubeEmbedUrl(youtubeLink: string): string {
    if (!youtubeLink) return '';

    try {
      // Extract video ID from various YouTube URL formats
      const urlObj = new URL(youtubeLink);
      let videoId = '';

      if (urlObj.hostname.includes('youtu.be')) {
        // Short URL format (youtu.be/VIDEO_ID)
        videoId = urlObj.pathname.substring(1);
      } else if (urlObj.searchParams.get('v')) {
        // Standard format with query parameter (youtube.com/watch?v=VIDEO_ID)
        videoId = urlObj.searchParams.get('v') || '';
      } else if (urlObj.pathname.includes('/embed/')) {
        // Already in embed format
        videoId = urlObj.pathname.split('/embed/')[1];
      } else if (urlObj.pathname.includes('/v/')) {
        // Old format
        videoId = urlObj.pathname.split('/v/')[1];
      }

      return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
    } catch (e) {
      console.error('Invalid URL:', youtubeLink);
      return '';
    }
  }

  getThumbnailUrl(youtubeLink: string): string {
    if (!youtubeLink) return '/assets/images/placeholder-thumbnail.jpg';

    try {
      // Extract video ID
      const urlObj = new URL(youtubeLink);
      let videoId = '';

      if (urlObj.hostname.includes('youtu.be')) {
        videoId = urlObj.pathname.substring(1);
      } else if (urlObj.searchParams.get('v')) {
        videoId = urlObj.searchParams.get('v') || '';
      } else if (urlObj.pathname.includes('/embed/')) {
        videoId = urlObj.pathname.split('/embed/')[1];
      } else if (urlObj.pathname.includes('/v/')) {
        videoId = urlObj.pathname.split('/v/')[1];
      }

      // YouTube thumbnail URL formats
      return videoId
        ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
        : '/assets/images/placeholder-thumbnail.jpg';
    } catch (e) {
      return '/assets/images/placeholder-thumbnail.jpg';
    }
  }

  viewEpisodeDetails(episodeId: string): void {
    this.router.navigate(['/episodes', episodeId]);
  }

  openYouTubeLink(youtubeLink: string, event: Event): void {
    event.stopPropagation();
    window.open(youtubeLink, '_blank');
  }
}
