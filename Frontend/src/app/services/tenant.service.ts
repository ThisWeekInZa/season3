import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BackendService } from './backend.service';
import { HttpClient } from '@angular/common/http';
import { TenantDto } from '../dto/tenant.dto';
import {
  QueryOptions,
  QueryResult,
  ProcessResult,
} from '../components/common-dto/query.dto';

@Injectable({
  providedIn: 'root',
})
export class TenantService {
  constructor(private backend: BackendService, private http: HttpClient) {}

  getTenants(queryParams?: QueryOptions): Observable<QueryResult<TenantDto>> {
    return this.backend.getQuery<TenantDto>('tenant', queryParams || {});
  }

  getTenant(tenantId: string): Observable<TenantDto> {
    return this.backend.get<TenantDto>(`tenant/${tenantId}`);
  }

  createTenant(tenant: Partial<TenantDto>): Observable<ProcessResult> {
    // Remove timestamps as they should be set by the server
    tenant.createdAt = undefined;
    tenant.updatedAt = undefined;
    return this.backend.post<ProcessResult>('tenant', tenant);
  }

  updateTenant(
    tenantId: string,
    tenant: Partial<TenantDto>
  ): Observable<ProcessResult> {
    // Remove timestamps as they should be set by the server
    tenant.createdAt = undefined;
    tenant.updatedAt = undefined;
    return this.backend.put<ProcessResult>(`tenant/${tenantId}`, tenant);
  }

  deleteTenant(tenantId: string): Observable<ProcessResult> {
    return this.backend.delete<ProcessResult>(`tenant/${tenantId}`);
  }

  addUserToTenant(tenantId: string, userId: string): Observable<ProcessResult> {
    return this.backend.post<ProcessResult>(`tenant/${tenantId}/users`, {
      userId,
    });
  }

  removeUserFromTenant(
    tenantId: string,
    userId: string
  ): Observable<ProcessResult> {
    return this.backend.delete<ProcessResult>(
      `tenant/${tenantId}/users/${userId}`
    );
  }

  getTenantUsers(
    tenantId: string,
    queryParams?: QueryOptions
  ): Observable<QueryResult<any>> {
    return this.backend.getQuery<any>(
      `tenant/${tenantId}/users`,
      queryParams || {}
    );
  }
}
