import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { HomeComponent } from './pages/home/home.component';

import { authGuard } from './guards/auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';

import { UserListComponent } from './pages/users/user-list/user-list.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { AuthMicrosoftComponent } from './pages/auth/auth-microsoft/auth-microsoft.component';
import { TestItemComponent } from './pages/test-item/test-item.component';
import { UserDetailComponent } from './pages/users/user-detail/user-detail.component';
import { UsersTenantListComponent } from './pages/users/users-tenant-list/users-tenant-list.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminTenantListComponent } from './pages/admin/admin-tenant-list/admin-tenant-list.component';
import { AdminUserListComponent } from './pages/admin/admin-user-list/admin-user-list.component';
import { AdminTenantDetailComponent } from './pages/admin/admin-tenant-detail/admin-tenant-detail.component';
import { AdminTenantUsersListComponent } from './pages/admin/admin-tenant-users-list/admin-tenant-users-list.component';
import { AuthCognitoComponent } from './pages/auth/auth-cognito/auth-cognito.component';
import { PostListComponent } from './pages/posts/post-list.component';
import { PostsComponent } from './pages/posts/posts.component';

export const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    title: 'Profile',
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
    canActivate: [authGuard],
    title: 'Notifications',
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home - This Week in ZA',
  },
  {
    path: 'authmicrosoft',
    component: AuthMicrosoftComponent,
  },
  {
    path: 'authcognito',
    component: AuthCognitoComponent,
  },
  {
    path: 'testitem',
    component: TestItemComponent,
    canActivate: [authGuard],
  },
  {
    path: 'users',
    component: UserListComponent,
    data: {
      title: 'Users',
      icon: 'pi pi-users',
      breadcrumb: [
        { label: 'Users', routerLink: ['/users'], icon: 'pi pi-users' },
      ],
    },
    canActivate: [authGuard],
  },
  {
    path: 'users/:id',
    component: UserDetailComponent,
    data: {
      title: 'User',
      icon: 'pi pi-user',
      canReplace: true,
      breadcrumb: [
        { label: 'Users', routerLink: ['/users'], icon: 'pi pi-users' },
        { label: 'User', routerLink: ['/users', ':id'], icon: 'pi pi-user' },
      ],
    },
    canActivate: [authGuard],
  },
  {
    path: 'users/:id/tenants',
    component: UsersTenantListComponent,
    data: {
      breadcrumb: [
        { label: 'Users', routerLink: ['/users'], icon: 'pi pi-users' },
        { label: 'User', routerLink: ['/users', ':id'], icon: 'pi pi-user' },
        {
          label: 'Tenants',
          routerLink: ['/users', ':id', 'tenants'],
          icon: 'pi pi-sitemap',
        },
      ],
    },
    canActivate: [authGuard],
  },
  {
    path: 'admin',
    component: AdminComponent,
    data: {
      breadcrumb: [
        { label: 'Admin', routerLink: ['/admin'], icon: 'pi pi-cog' },
      ],
    },
    canActivate: [authGuard],
  },
  {
    path: 'admin/tenants',
    component: AdminTenantListComponent,
    data: {
      breadcrumb: [
        { label: 'Admin', routerLink: ['/admin'], icon: 'pi pi-cog' },
        {
          label: 'Tenants',
          routerLink: ['/admin/tenants'],
          icon: 'pi pi-building',
        },
      ],
    },
    canActivate: [authGuard],
  },
  {
    path: 'admin/users',
    component: AdminUserListComponent,
    data: {
      breadcrumb: [
        { label: 'Admin', routerLink: ['/admin'], icon: 'pi pi-cog' },
        {
          label: 'Users',
          routerLink: ['/admin/users'],
          icon: 'pi pi-users',
        },
      ],
    },
    canActivate: [authGuard],
  },
  {
    path: 'admin/users/:id',
    component: UserDetailComponent,
    data: {
      breadcrumb: [
        { label: 'Admin', routerLink: ['/admin'], icon: 'pi pi-cog' },
        {
          label: 'Users',
          routerLink: ['/admin/users'],
          icon: 'pi pi-users',
        },
        {
          label: 'User',
          routerLink: ['/admin/users', ':id'],
          icon: 'pi pi-user',
        },
      ],
    },
    canActivate: [authGuard],
  },
  {
    path: 'admin/users/:id/tenants',
    component: UsersTenantListComponent,
    data: {
      breadcrumb: [
        { label: 'Admin', routerLink: ['/admin'], icon: 'pi pi-cog' },
        {
          label: 'Users',
          routerLink: ['/admin/users'],
          icon: 'pi pi-users',
        },
        {
          label: 'User',
          routerLink: ['/admin/users', ':id'],
          icon: 'pi pi-user',
        },
        {
          label: 'Tenants',
          routerLink: ['/admin/users', ':id', 'tenants'],
          icon: 'pi pi-sitemap',
        },
      ],
    },
    canActivate: [authGuard],
  },
  {
    path: 'admin/tenants/:id',
    component: AdminTenantDetailComponent,
    data: {
      breadcrumb: [
        { label: 'Admin', routerLink: ['/admin'], icon: 'pi pi-cog' },
        {
          label: 'Tenants',
          routerLink: ['/admin/tenants'],
          icon: 'pi pi-building',
        },
        {
          label: 'Tenant',
          routerLink: ['/admin/tenants', ':id'],
          icon: 'pi pi-building',
          canReplace: true,
        },
      ],
    },
    canActivate: [authGuard],
  },
  {
    path: 'admin/tenants/:id/users',
    component: AdminTenantUsersListComponent,
    data: {
      breadcrumb: [
        { label: 'Admin', routerLink: ['/admin'], icon: 'pi pi-cog' },
        {
          label: 'Tenants',
          routerLink: ['/admin/tenants'],
          icon: 'pi pi-building',
        },
        {
          label: 'Tenant',
          routerLink: ['/admin/tenants', ':id'],
          icon: 'pi pi-building',
        },
        {
          label: 'Users',
          routerLink: ['/admin/tenants', ':id', 'users'],
          icon: 'pi pi-users',
        },
      ],
    },
    canActivate: [authGuard],
  },

  {
    path: 'authcognito',
    component: AuthCognitoComponent,
  },
  {
    path: 'posts',
    component: PostListComponent,
    data: {
      title: 'Posts',
      icon: 'pi pi-video',
      breadcrumb: [
        {
          label: 'Posts',
          routerLink: ['/posts'],
          icon: 'pi pi-video',
        },
      ],
    },
  },
  {
    path: 'admin/posts',
    component: PostListComponent,
    title: 'Episodes Admin',
    data: {
      title: 'Episodes Admin',
      icon: 'pi pi-cog',
      breadcrumb: [
        {
          label: 'Episodes Admin',
          routerLink: ['admin/posts'],
          icon: 'pi pi-cog',
        },
      ],
    },
  },
  {
    path: '**',
    component: HomeComponent,
  },
];
