import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ItemListComponent } from '../../components/item-list/item-list.component';
import { ItemListConfig } from '../../components/item-list/item-list.types';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-episode-list',
  standalone: true,
  imports: [CommonModule, ItemListComponent],
  template: `<pb-item-list [config]="listConfig"></pb-item-list>`,
})
export class PostListComponent {
  listConfig: ItemListConfig = {
    header: 'Posts',
    supportsAdd: true,
    supportsEdit: true,
    supportsDelete: true,
    defaultSortField: 'createdAt',
    enableSearch: true,
    columns: [
      {
        field: 'title',
        header: 'Title',
        type: 'text',
        sortable: true,
      },
      {
        field: 'guest1',
        header: 'Guest',
        type: 'text',
        sortable: true,
      },
      {
        field: 'guest2',
        header: 'Guest 2',
        type: 'text',
        sortable: true,
        mobileHide: true,
      },
      {
        field: 'createdAt',
        header: 'Created',
        type: 'date',
        format: 'short',
        sortable: true,
        mobileHide: true,
      },
      {
        field: 'youTubeLink',
        header: 'YouTube',
        type: 'text',
        sortable: false,
        mobileHide: true,
      },
    ],
    dataService: {
      parseParams: (params, queryParams) => ({
        skip: queryParams['skip'] || 0,
        take: queryParams['take'] || 10,
      }),
      loadItems: (params) => this.postService.getPosts(params),
      deleteItem: (params, item) => this.postService.deletePost(item.id),
    },
    onEdit: (item) => {
      this.router.navigate(['/episodes', item.id]);
    },
    customToolbarItems: [
      {
        label: 'View Latest',
        icon: 'pi pi-video',
        onClick: () => {
          this.router.navigate(['/']);
        },
      },
    ],
  };

  constructor(private postService: PostService, private router: Router) {}
}
