import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  ProcessResult,
  QueryOptions,
  QueryResult,
  QueryResultItem,
} from '../components/common-dto/query.dto';
import { PostDto } from '../dto/post.dto';

@Injectable({
  providedIn: 'root',
})
export class MockPostService {
  private episodes: Map<string, PostDto> = new Map<string, PostDto>();
  private lastId: number = 0;

  constructor() {
    // Initialize with some mock data
    this.addMockEpisode({
      title: 'Dougs Revenge',
      guest1: 'Doug Durham',
      guest1UserId: 'user123',
      guest2: '',
      description: 'Doug joins us to discuss 15 years of DPL.',
      youTubeLink: 'https://youtu.be/RxGvWKBCw6g',
      createdAt: new Date(2025, 4, 22),
      updatedAt: new Date(2025, 4, 22),
      image: '/images/E19.png',
    });

    this.addMockEpisode({
      title: 'Steve West',
      guest1: 'Steve West',
      guest1UserId: 'user456',
      description:
        'You wont believe who Steve throws under the bus in this episode. Just kidding, great episode dis...',
      youTubeLink: 'https://youtu.be/PCSzLIT6z0o',
      createdAt: new Date(2023, 3, 31),
      updatedAt: new Date(2023, 3, 31),
      image: '/images/E18.png',
    });

    this.addMockEpisode({
      title: 'Steve Kiene',
      guest1: 'Steve Kiene',
      guest1UserId: 'user456',
      description:
        'The legendary Steve Kiene joins us to talk about starting companies, AI, and pizza.',
      youTubeLink: 'https://youtu.be/62_IvEJufCA',
      createdAt: new Date(2023, 3, 13),
      updatedAt: new Date(2023, 3, 13),
      image: '/images/E17.png',
    });

    this.addMockEpisode({
      title: 'AI Revolution in Africa',
      guest1: 'Dr. Sarah Mkhize',
      guest1UserId: 'user789',
      description:
        'Exploring how artificial intelligence is transforming industries across the African continent.',
      youTubeLink: 'https://youtu.be/example1',
      createdAt: new Date(2023, 2, 28),
      updatedAt: new Date(2023, 2, 28),
      image: '/images/E16.png',
    });

    this.addMockEpisode({
      title: 'Startup Funding in SA',
      guest1: 'Michael van der Merwe',
      guest1UserId: 'user101',
      description:
        'Insights into the South African startup funding landscape and what investors are looking for.',
      youTubeLink: 'https://youtu.be/example2',
      createdAt: new Date(2023, 2, 15),
      updatedAt: new Date(2023, 2, 15),
      image: '/images/E15.png',
    });

    this.addMockEpisode({
      title: 'Digital Transformation',
      guest1: 'Lisa Pretorius',
      guest1UserId: 'user202',
      description:
        'How South African businesses are adapting to the digital age and what the future holds.',
      youTubeLink: 'https://youtu.be/example3',
      createdAt: new Date(2023, 2, 1),
      updatedAt: new Date(2023, 2, 1),
      image: '/images/E14.png',
    });
  }

  private addMockEpisode(episode: PostDto): string {
    const id = (++this.lastId).toString();
    this.episodes.set(id, { ...episode });
    return id;
  }

  getPosts(queryParams: QueryOptions): Observable<QueryResult<PostDto>> {
    const skip = queryParams.skip || 0;
    const take = queryParams.take || 10;

    let filteredEpisodes: QueryResultItem<PostDto>[] = [];

    this.episodes.forEach((episode, id) => {
      // Apply filter if provided
      if (
        queryParams.filter &&
        !episode.title.toLowerCase().includes(queryParams.filter.toLowerCase())
      ) {
        return;
      }

      filteredEpisodes.push({
        id,
        item: { ...episode },
      });
    });

    // Sort episodes by date (newest first)
    filteredEpisodes.sort((a, b) => {
      const dateA = a.item.createdAt ? new Date(a.item.createdAt).getTime() : 0;
      const dateB = b.item.createdAt ? new Date(b.item.createdAt).getTime() : 0;
      return dateB - dateA;
    });

    const total = filteredEpisodes.length;
    const paginatedEpisodes = filteredEpisodes.slice(skip, skip + take);

    return of({
      items: paginatedEpisodes,
      total,
      take,
      skip,
    });
  }

  getPost(id: string): Observable<PostDto> {
    const episode = this.episodes.get(id);
    if (episode) {
      return of({ ...episode });
    }
    return of({} as PostDto);
  }

  createPost(episode: PostDto): Observable<ProcessResult> {
    episode.createdAt = new Date();
    episode.updatedAt = new Date();
    const id = this.addMockEpisode(episode);

    return of({
      success: true,
      message: 'Episode created successfully',
      id,
    });
  }

  updatePost(id: string, episode: PostDto): Observable<ProcessResult> {
    if (!this.episodes.has(id)) {
      return of({
        id: '',
        success: false,
        message: 'Episode not found',
      });
    }

    episode.updatedAt = new Date();
    this.episodes.set(id, { ...episode });

    return of({
      success: true,
      message: 'Episode updated successfully',
      id,
    });
  }

  deletePost(id: string): Observable<ProcessResult> {
    if (!this.episodes.has(id)) {
      return of({
        id: '',
        success: false,
        message: 'Episode not found',
      });
    }

    this.episodes.delete(id);

    return of({
      id,
      success: true,
      message: 'Episode deleted successfully',
    });
  }
}
