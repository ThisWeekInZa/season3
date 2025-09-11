import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ItemDetailComponent } from '../../components/item-detail/item-detail.component';
import { ItemDetailConfig } from '../../components/item-detail/item-detail.types';
import { PostService } from '../../services/post.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-post-detail',
    standalone: true,
    imports: [CommonModule, ItemDetailComponent, ToastModule],
    providers: [MessageService],
    template: `<pb-item-detail [config]="detailConfig"></pb-item-detail>`,
})
export class PostDetailComponent {
    detailConfig: ItemDetailConfig = {
        header: 'Post Details',
        isEditable: true,
        supportsAdd: false,
        supportsDelete: true,
        formLayout: [
            {
                key: 'title',
                label: 'Title',
                type: 'text',
                required: true,
            },
            {
                key: 'guest1',
                label: 'Guest 1',
                type: 'text',
                required: false,
            },
            {
                key: 'guest2',
                label: 'Guest 2',
                type: 'text',
                required: false,
            },
            {
                key: 'description',
                label: 'Description',
                type: 'textarea',
                required: true,
            },
            {
                key: 'youTubeLink',
                label: 'YouTube Link',
                type: 'text',
                required: false,
            },
            {
                key: 'publishedDate',
                label: 'Published Date',
                type: 'date',
                required: false,
            },
            {
                key: 'published',
                label: 'Published',
                type: 'checkbox',
                required: false,
            },
            {
                key: 'image',
                label: 'Image URL',
                type: 'text',
                required: false,
            },
            {
                key: 'audio',
                label: 'Audio URL',
                type: 'text',
                required: false,
            },
            {
                key: 'transcript',
                label: 'Transcript',
                type: 'textarea',
                required: false,
            },
        ],
        dataService: {
            parseParams: (params, queryParams) => ({
                skip: queryParams['skip'] || 0,
                take: queryParams['take'] || 10,
                id: params['id'],
            }),
            loadItem: (params) => {
                const id = params['id'];
                if (!id) {
                    throw new Error('Post ID is required');
                }
                return this.postService.getPost(id);
            },
            createItem: (params, item) => this.postService.createPost(item),
            updateItem: (params, item) => {
                const id = params['id'];
                if (!id) {
                    throw new Error('Post ID is required');
                }
                return this.postService.updatePost(id, item);
            },
            deleteItem: (params) => {
                const id = params['id'];
                if (!id) {
                    throw new Error('Post ID is required');
                }
                return this.postService.deletePost(id);
            },
        },
    };

    constructor(
        private readonly postService: PostService,
        private readonly router: Router
    ) { }
}
