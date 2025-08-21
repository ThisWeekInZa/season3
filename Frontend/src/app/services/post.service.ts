import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BackendService } from './backend.service';
import { PostDto } from '../dto/post.dto';
import {
  ProcessResult,
  QueryOptions,
  QueryResult,
} from '../components/common-dto/query.dto';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private backend: BackendService, private http: HttpClient) {}

  getPosts(queryParams: QueryOptions): Observable<QueryResult<PostDto>> {
    return this.backend.getQuery<PostDto>('post', queryParams);
  }

  getPost(id: string): Observable<PostDto> {
    return this.backend.get<PostDto>(`post/${id}`);
  }

  createPost(post: PostDto): Observable<ProcessResult> {
    post.createdAt = undefined;
    post.updatedAt = undefined;
    return this.backend.post<ProcessResult>('post', post);
  }

  updatePost(id: string, post: PostDto): Observable<ProcessResult> {
    return this.backend.put<ProcessResult>(`post/${id}`, post);
  }

  deletePost(id: string): Observable<ProcessResult> {
    return this.backend.delete<ProcessResult>(`post/${id}`);
  }
}
