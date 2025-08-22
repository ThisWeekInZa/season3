import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { PostService } from '../../services/post.service';
import { PostDto } from '../../dto/post.dto';
import { QueryResultItem } from '../../components/common-dto/query.dto';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, CardModule, ButtonModule, InputTextModule, PaginatorModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  latestEpisode: QueryResultItem<PostDto> | null = null;
  episodes: QueryResultItem<PostDto>[] = [];
  searchTerm: string = '';
  totalRecords: number = 0;
  rows: number = 6;
  first: number = 0;

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit() {
    this.loadEpisodes();
  }

  loadEpisodes() {
    this.postService.getPosts({
      skip: this.first,
      take: this.rows + 1, // Load one extra to get latest episode
      filter: this.searchTerm
    }).subscribe(result => {
      if (result.items.length > 0) {
        this.latestEpisode = result.items[0]; // First item is latest
        this.episodes = result.items.slice(1); // Rest are for episodes grid
        this.totalRecords = Math.max(0, result.total - 1); // Subtract 1 for the latest episode
      }
    });
  }

  onSearch() {
    this.first = 0;
    this.loadEpisodes();
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.loadEpisodes();
  }

  watchOnYoutube(episode: QueryResultItem<PostDto> | null) {
    if (episode?.item.youTubeLink) {
      window.open(episode.item.youTubeLink, '_blank');
    }
  }

  viewAllEpisodes() {
    this.router.navigate(['/posts']);
  }

  formatDate(date: Date | undefined): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}
