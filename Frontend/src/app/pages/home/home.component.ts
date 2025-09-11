import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PostService } from '../../services/post.service';
import { PostDto } from '../../dto/post.dto';
import { QueryOptions } from '../../components/common-dto/query.dto';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CardModule,
    ButtonModule,
    AvatarModule,
    AvatarGroupModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  latestEpisode: PostDto | null = null;
  loading = true;
  error = false;

  constructor(
    private sanitizer: DomSanitizer,
    private postService: PostService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadLatestEpisode();
  }

  loadLatestEpisode() {
    this.loading = true;
    this.error = false;

    const queryParams: QueryOptions = {
      take: 1,
      skip: 0,
    };

    this.postService.getPosts(queryParams).subscribe({
      next: (result) => {
        if (result.items && result.items.length > 0) {
          this.latestEpisode = result.items[0].item;
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading latest episode:', err);
        this.error = true;
        this.loading = false;
      },
    });
  }

  get youtubeUrl(): SafeResourceUrl | null {
    if (!this.latestEpisode?.youTubeLink) return null;

    // Extract YouTube video ID from the link
    const videoId = this.extractYouTubeId(this.latestEpisode.youTubeLink);
    if (!videoId) return null;

    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${videoId}?rel=0`
    );
  }

  private extractYouTubeId(url: string): string | null {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  }

  watchOnYouTube() {
    if (this.latestEpisode?.youTubeLink) {
      window.open(this.latestEpisode.youTubeLink, '_blank');
    }
  }

  viewAllEpisodes() {
    // Navigate to posts page to show all episodes
    this.router.navigate(['/posts']);
  }

  retry() {
    this.loadLatestEpisode();
  }

  // Helper method to format date
  formatDate(date: Date | undefined): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
