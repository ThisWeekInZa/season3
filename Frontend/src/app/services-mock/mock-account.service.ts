import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { UserDto } from '../dto/user.dto';
import {
  QueryResult,
  QueryOptions,
  ProcessResult,
  QueryResultItem,
} from '../components/common-dto/query.dto';
import { TenantInfo } from '../dto/auth.dto';

@Injectable({
  providedIn: 'root',
})
export class MockAccountService {
  // Mock user data
  private mockUserInTeams: any[] = [
    {
      teamId: '1',
      userId: '776459da-2256-4b55-8bc7-7aa20601213e',
    },
  ];

  private mockUsers: any = {
    items: [
      {
        item: {
          username: 'jsmith@dontpaniclabs.com',
          email: 'jsmith@dontpaniclabs.com',
          firstName: 'John',
          lastName: 'Smith',
          role: 'admin',
          source: 'LOCAL',
          tenants: [
            {
              id: '314c457d-0733-4f16-a14f-263f474cd90c',
              name: 'Default',
            },
          ],
          isPrimaryBillable: null,
          title: '',
          classification: null,
          externalId: null,
          targetHoursPerWeek: 0,
          managerId: 'eec01fe6-e318-4a05-9cea-b7df6ea383db',
          managerName: 'Richard Johnson',
          isRootNode: false,
          isOwner: true,
          displayName: 'John Smith',
          team: null,
          title2: null,
        },
        id: '776459da-2256-4b55-8bc7-7aa20601213e',
      },
      {
        item: {
          username: 'rjohnson@dontpaniclabs.com',
          email: 'rjohnson@dontpaniclabs.com',
          firstName: 'Richard',
          lastName: 'Johnson',
          role: 'admin',
          source: 'LOCAL',
          tenants: [
            {
              id: '314c457d-0733-4f16-a14f-263f474cd90c',
              name: 'Default',
            },
          ],
          isPrimaryBillable: null,
          title: '',
          classification: null,
          externalId: null,
          targetHoursPerWeek: 0,
          managerId: null,
          managerName: null,
          isRootNode: true,
          isOwner: true,
          displayName: 'Richard Johnson',
          team: null,
          title2: null,
        },
        id: 'eec01fe6-e318-4a05-9cea-b7df6ea383db',
      },
      {
        item: {
          username: 'swilliams@dontpaniclabs.com',
          email: 'swilliams@dontpaniclabs.com',
          firstName: 'Sarah',
          lastName: 'Williams',
          role: 'user',
          source: 'LOCAL',
          tenants: [
            {
              id: '314c457d-0733-4f16-a14f-263f474cd90c',
              name: 'Default',
            },
          ],
          isPrimaryBillable: false,
          title: null,
          classification: 'Biz',
          externalId: '4752066',
          targetHoursPerWeek: 0,
          managerId: 'eec01fe6-e318-4a05-9cea-b7df6ea383db',
          managerName: 'Richard Johnson',
          isRootNode: false,
          isOwner: false,
          displayName: 'Sarah Williams',
          team: '',
          title2: 'Biz',
        },
        id: '938b7d74-b53a-43ab-af12-77171d3b5034',
      },
      {
        item: {
          username: 'dthomas@dontpaniclabs.com',
          email: 'dthomas@dontpaniclabs.com',
          firstName: 'David',
          lastName: 'Thomas',
          role: 'user',
          source: 'LOCAL',
          tenants: [
            {
              id: '314c457d-0733-4f16-a14f-263f474cd90c',
              name: 'Default',
            },
          ],
          isPrimaryBillable: true,
          title: null,
          classification: 'PI',
          externalId: '4767693',
          targetHoursPerWeek: 18,
          managerId: '776459da-2256-4b55-8bc7-7aa20601213e',
          managerName: 'John Smith',
          isRootNode: false,
          isOwner: false,
          displayName: 'David Thomas',
          team: '0x42',
          title2: 'PI',
        },
        id: '7bb0644c-0479-4e97-a257-8531b65cb418',
      },
      {
        item: {
          username: 'agarcia@dontpaniclabs.com',
          email: 'agarcia@dontpaniclabs.com',
          firstName: 'Alex',
          lastName: 'Garcia',
          role: 'user',
          source: 'LOCAL',
          tenants: [
            {
              id: '314c457d-0733-4f16-a14f-263f474cd90c',
              name: 'Default',
            },
          ],
          isPrimaryBillable: true,
          title: 'Sr Software Engineer',
          classification: 'Architect',
          externalId: '2566665',
          targetHoursPerWeek: 27,
          managerId: '776459da-2256-4b55-8bc7-7aa20601213e',
          managerName: 'John Smith',
          isRootNode: false,
          isOwner: false,
          displayName: 'Alex Garcia',
          team: 'NeDPod',
          title2: 'Architect',
        },
        id: 'a614b506-1e24-4031-b60e-2e8abb056358',
      },
      {
        item: {
          username: 'rmiller@dontpaniclabs.com',
          email: 'rmiller@dontpaniclabs.com',
          firstName: 'Robert',
          lastName: 'Miller',
          role: 'user',
          source: 'LOCAL',
          tenants: [
            {
              id: '314c457d-0733-4f16-a14f-263f474cd90c',
              name: 'Default',
            },
          ],
          isPrimaryBillable: true,
          title: null,
          classification: 'UX',
          externalId: '2566656',
          targetHoursPerWeek: 18,
          managerId: '776459da-2256-4b55-8bc7-7aa20601213e',
          managerName: 'John Smith',
          isRootNode: false,
          isOwner: false,
          displayName: 'Robert Miller',
          team: 'The A Team',
          title2: 'UX',
        },
        id: 'dbca98b5-7724-4ece-902e-2b3495193e7d',
      },
      {
        item: {
          username: 'ldavid@dontpaniclabs.com',
          email: 'ldavid@dontpaniclabs.com',
          firstName: 'Larry',
          lastName: 'David',
          role: 'admin',
          source: 'LOCAL',
          tenants: [
            {
              id: '314c457d-0733-4f16-a14f-263f474cd90c',
              name: 'Default',
            },
          ],
          isPrimaryBillable: false,
          title: null,
          classification: 'Sr Architect',
          externalId: '2566660',
          targetHoursPerWeek: 0,
          managerId: '776459da-2256-4b55-8bc7-7aa20601213e',
          managerName: 'John Smith',
          isRootNode: false,
          isOwner: false,
          displayName: 'Larry David',
          team: '',
          title2: 'Sr Architect',
        },
        id: '11eb6bd0-b68f-4a1c-913d-3be38babc639',
      },
    ],
    total: 50,
    take: 100,
    skip: 0,
  };

  constructor() {}

  getCurrentProfile(): Observable<UserDto> {
    const mockUserProfile = this.mockUsers.items[6].item;
    return of(mockUserProfile);
  }

  updateProfile(profile: UserDto): Observable<ProcessResult> {
    return of({
      success: true,
      message: 'Profile updated successfully',
      id: profile.username,
    });
  }

  getAccount(id: string): Observable<UserDto> {
    // If requesting "new", return empty user template
    if (id === 'new') {
      return of({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        role: 'user',
        source: 'LOCAL',
        tenants: [
          { id: '314c457d-0733-4f16-a14f-263f474cd90c', name: 'Default' },
        ],
        isPrimaryBillable: false,
        title: '',
        classification: '',
        externalId: '',
        targetHoursPerWeek: 0,
        displayName: '',
        team: '',
        title2: '',
      });
    }

    // Find user by ID
    const foundUser = this.mockUsers.items.find((user: any) => user.id === id);
    if (foundUser) {
      return of(foundUser.item);
    }

    // Return the first user as a fallback
    return of(this.mockUsers.items[0].item);
  }

  updateAccount(id: string, user: UserDto): Observable<ProcessResult> {
    return of({ success: true, message: 'Account updated successfully', id });
  }

  createAccount(user: UserDto): Observable<ProcessResult> {
    const newId = 'new-' + Math.random().toString(36).substring(2, 10);
    return of({
      success: true,
      message: 'Account created successfully',
      id: newId,
    });
  }

  deleteAccount(id: string): Observable<ProcessResult> {
    return of({ success: true, message: 'Account deleted successfully', id });
  }

  getAccounts(queryParams: QueryOptions): Observable<QueryResult<UserDto>> {
    // Apply pagination if specified in query params
    let items = [...this.mockUsers.items];
    let total = items.length;

    // Filter by team if specified
    if (queryParams.filter && queryParams.filter.trim() !== '') {
      const filterLower = queryParams.filter.toLowerCase();
      items = items.filter(
        (user) =>
          user.item.username?.toLowerCase().includes(filterLower) ||
          user.item.firstName?.toLowerCase().includes(filterLower) ||
          user.item.lastName?.toLowerCase().includes(filterLower) ||
          user.item.displayName?.toLowerCase().includes(filterLower) ||
          user.item.team?.toLowerCase().includes(filterLower) ||
          user.item.classification?.toLowerCase().includes(filterLower) ||
          user.item.title?.toLowerCase().includes(filterLower)
      );
      total = items.length;
    }

    if (queryParams.groupId) {
      if (queryParams.excludeMine) {
        items = items.filter((user) => {
          const userInTeam = this.mockUserInTeams.find(
            (userInTeam: any) =>
              userInTeam.userId === user.id &&
              userInTeam.teamId === queryParams.groupId
          );
          return userInTeam === undefined;
        });
        total = items.length;
      } else {
        items = items.filter((user) => {
          const userInTeam = this.mockUserInTeams.find(
            (userInTeam: any) =>
              userInTeam.userId === user.id &&
              userInTeam.teamId === queryParams.groupId // Check if user is in the team
          );
          return userInTeam !== undefined;
        });
        total = items.length;
      }
    }

    // Handle lookup list request
    if (queryParams.lookupList) {
      return of({
        items: items.map((user) => ({
          id: user.id,
          value: user.id,
          label:
            user.item.displayName ||
            `${user.item.firstName} ${user.item.lastName}`,
          name: user.item.displayName,
        })),
        total,
        take: queryParams.take || items.length,
        skip: queryParams.skip || 0,
      } as any);
    }

    // Apply skip and take for pagination
    if (queryParams.take && queryParams.skip !== undefined) {
      const skip = Number(queryParams.skip);
      const take = Number(queryParams.take);
      items = items.slice(skip, skip + take);
    }

    return of({
      items,
      total,
      take: queryParams.take || items.length,
      skip: queryParams.skip || 0,
    });
  }

  getAccountsForLookup(): Observable<any[]> {
    return of(
      this.mockUsers.items.map((user: any) => ({
        id: user.id,
        value: user.id,
        label:
          user.item.displayName ||
          `${user.item.firstName} ${user.item.lastName}`,
        name: user.item.displayName,
      }))
    );
  }

  changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ): Observable<ProcessResult> {
    return of({
      success: true,
      message: 'Password changed successfully',
      id: userId,
    });
  }

  resetPassword(userId: string): Observable<ProcessResult> {
    return of({
      success: true,
      message: 'Password reset successfully',
      id: userId,
    });
  }
}
