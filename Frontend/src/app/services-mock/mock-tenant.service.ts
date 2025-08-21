import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TenantDto } from '../dto/tenant.dto';
import {
  QueryOptions,
  QueryResult,
  ProcessResult,
} from '../components/common-dto/query.dto';

@Injectable({
  providedIn: 'root',
})
export class MockTenantService {
  private mockTenants: any = {
    items: [
      {
        id: '1',
        item: {
          name: 'Acme Corporation',
          description: 'IT services and consulting',
          domain: 'acme.com',
          status: 'active',
          plan: 'enterprise',
          maxUsers: 100,
          expirationDate: new Date(2025, 11, 31),
          createdAt: new Date(2023, 0, 15),
          updatedAt: new Date(2024, 2, 10),
          settings: {
            theme: 'dark',
            features: ['projects', 'timetracking', 'invoicing'],
            customLogo: 'acme_logo.png',
          },
        },
      },
      {
        id: '2',
        item: {
          name: 'TechNova Inc.',
          description: 'Software development company',
          domain: 'technova.dev',
          status: 'active',
          plan: 'professional',
          maxUsers: 50,
          expirationDate: new Date(2025, 9, 15),
          createdAt: new Date(2023, 2, 20),
          updatedAt: new Date(2024, 1, 5),
          settings: {
            theme: 'light',
            features: ['projects', 'timetracking'],
            customLogo: 'technova_logo.png',
          },
        },
      },
      {
        id: '3',
        item: {
          name: 'Global Solutions Ltd',
          description: 'Consulting services',
          domain: 'globalsolutions.co',
          status: 'active',
          plan: 'professional',
          maxUsers: 25,
          expirationDate: new Date(2025, 6, 30),
          createdAt: new Date(2023, 5, 10),
          updatedAt: new Date(2024, 0, 15),
          settings: {
            theme: 'light',
            features: ['projects', 'invoicing'],
            customLogo: null,
          },
        },
      },
      {
        id: '4',
        item: {
          name: 'Innovate Design Studio',
          description: 'UX/UI design agency',
          domain: 'innovatedesign.io',
          status: 'active',
          plan: 'standard',
          maxUsers: 15,
          expirationDate: new Date(2025, 4, 1),
          createdAt: new Date(2023, 7, 5),
          updatedAt: new Date(2023, 11, 20),
          settings: {
            theme: 'custom',
            features: ['projects', 'timetracking'],
            customLogo: 'innovate_logo.png',
          },
        },
      },
      {
        id: '5',
        item: {
          name: 'Summit Marketing',
          description: 'Digital marketing company',
          domain: 'summitmarketing.com',
          status: 'inactive',
          plan: 'standard',
          maxUsers: 10,
          expirationDate: new Date(2024, 11, 31),
          createdAt: new Date(2023, 3, 1),
          updatedAt: new Date(2024, 2, 1),
          settings: {
            theme: 'light',
            features: ['projects'],
            customLogo: null,
          },
        },
      },
    ],
    total: 5,
    take: 10,
    skip: 0,
  };

  /**
   * Get a paginated list of tenants with optional filtering
   */
  getTenants(queryParams?: QueryOptions): Observable<QueryResult<TenantDto>> {
    // Apply pagination if specified
    let filteredItems = [...this.mockTenants.items];
    const take = queryParams?.take || 10;
    const skip = queryParams?.skip || 0;

    // Apply filtering if specified
    if (queryParams?.filter) {
      const filterLower = queryParams.filter.toLowerCase();
      filteredItems = filteredItems.filter(
        (tenant) =>
          tenant.item.name.toLowerCase().includes(filterLower) ||
          (tenant.item.description &&
            tenant.item.description.toLowerCase().includes(filterLower))
      );
    }

    // Apply pagination
    const paginatedItems = filteredItems.slice(skip, skip + take);

    return of({
      items: paginatedItems,
      total: filteredItems.length,
      take: take,
      skip: skip,
    });
  }

  /**
   * Get a tenant by ID
   */
  getTenant(tenantId: string): Observable<TenantDto> {
    const foundTenant = this.mockTenants.items.find(
      (tenant: any) => tenant.id === tenantId
    );

    if (foundTenant) {
      return of(foundTenant.item);
    }

    // If not found, return a 404 error
    return new Observable((observer) => {
      observer.error({ status: 404, message: 'Tenant not found' });
    });
  }

  /**
   * Create a new tenant
   */
  createTenant(tenant: Partial<TenantDto>): Observable<ProcessResult> {
    // Generate a new ID
    const newId = (this.mockTenants.items.length + 1).toString();

    // Add timestamps
    const now = new Date();
    tenant.createdAt = now;
    tenant.updatedAt = now;

    // Add new tenant to mock data
    this.mockTenants.items.push({
      id: newId,
      item: tenant,
    });
    this.mockTenants.total++;

    return of({
      success: true,
      message: 'Tenant created successfully',
      id: newId,
    });
  }

  /**
   * Update an existing tenant
   */
  updateTenant(
    tenantId: string,
    tenant: Partial<TenantDto>
  ): Observable<ProcessResult> {
    const index = this.mockTenants.items.findIndex(
      (t: any) => t.id === tenantId
    );

    if (index !== -1) {
      // Update the timestamp
      tenant.updatedAt = new Date();

      // Merge the existing tenant with the updated fields
      this.mockTenants.items[index].item = {
        ...this.mockTenants.items[index].item,
        ...tenant,
      };

      return of({
        success: true,
        message: 'Tenant updated successfully',
        id: tenantId,
      });
    }

    return of({
      success: false,
      message: 'Tenant not found',
      id: tenantId,
    });
  }

  /**
   * Delete a tenant
   */
  deleteTenant(tenantId: string): Observable<ProcessResult> {
    const initialLength = this.mockTenants.items.length;

    this.mockTenants.items = this.mockTenants.items.filter(
      (tenant: any) => tenant.id !== tenantId
    );

    const wasDeleted = initialLength > this.mockTenants.items.length;

    if (wasDeleted) {
      this.mockTenants.total--;

      return of({
        success: true,
        message: 'Tenant deleted successfully',
        id: tenantId,
      });
    }

    return of({
      success: false,
      message: 'Tenant not found',
      id: tenantId,
    });
  }

  /**
   * Add a user to a tenant
   */
  addUserToTenant(tenantId: string, userId: string): Observable<ProcessResult> {
    return of({
      success: true,
      message: 'User added to tenant successfully',
      id: tenantId,
    });
  }

  /**
   * Remove a user from a tenant
   */
  removeUserFromTenant(
    tenantId: string,
    userId: string
  ): Observable<ProcessResult> {
    return of({
      success: true,
      message: 'User removed from tenant successfully',
      id: tenantId,
    });
  }

  /**
   * Get users in a tenant
   */
  getTenantUsers(
    tenantId: string,
    queryParams?: QueryOptions
  ): Observable<QueryResult<any>> {
    // Mock users for the tenant
    const mockUsers = [
      {
        id: 'user1',
        item: {
          username: 'johndoe',
          email: 'john.doe@example.com',
          firstName: 'John',
          lastName: 'Doe',
          role: 'admin',
          createdAt: new Date(2023, 1, 15),
          updatedAt: new Date(2024, 0, 10),
        },
      },
      {
        id: 'user2',
        item: {
          username: 'janesmith',
          email: 'jane.smith@example.com',
          firstName: 'Jane',
          lastName: 'Smith',
          role: 'user',
          createdAt: new Date(2023, 2, 20),
          updatedAt: new Date(2023, 11, 5),
        },
      },
      {
        id: 'user3',
        item: {
          username: 'mikebrown',
          email: 'mike.brown@example.com',
          firstName: 'Mike',
          lastName: 'Brown',
          role: 'user',
          createdAt: new Date(2023, 4, 10),
          updatedAt: new Date(2023, 9, 15),
        },
      },
    ];

    const take = queryParams?.take || 10;
    const skip = queryParams?.skip || 0;

    return of({
      items: mockUsers.slice(skip, skip + take),
      total: mockUsers.length,
      take: take,
      skip: skip,
    });
  }
}
