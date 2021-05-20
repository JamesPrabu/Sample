import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { ILookupTable, ILookupTableRow, ILookupTableRowAdded, ILookupTableRowUpdated, IManagedLookupAddUpdateResponse } from 'src/app/models/managed-lookups/managed-lookups';
import { ConfigurationService } from '../configuration/configuration.service';
import { SecureHttpClient } from '../secure-http-client/secure-http-client';

@Injectable({
  providedIn: 'root'
})
export class ManagedLookupsService {
  constructor(
    private secureHttpClient: SecureHttpClient,
    private configurationService: ConfigurationService
  ) {
  }

  public getManagedLookups(): Observable<ILookupTable[]> {
    return this.secureHttpClient.get(
      `${this.configurationService.getApiUrl()}/lookups/managedLookups`
    ).pipe(shareReplay());
  }

  public getManagedLookupRows(lookupTableId: string, organizationId: string): Observable<ILookupTableRow[]> {
    return this.secureHttpClient.get(
      `${this.configurationService.getApiUrl()}/lookups/managedLookups/managedLookupTable/${lookupTableId}/organization/${organizationId}`
    ).pipe(shareReplay());
  }

  public addManagedLookupDataRow(lookupTableId: string, lookupTableRows: ILookupTableRowAdded[]): Observable<IManagedLookupAddUpdateResponse> {
    return this.secureHttpClient.post(
      `${this.configurationService.getApiUrl()}/lookups/managedLookups/managedLookupTable/${lookupTableId}`,
      {
        addData: lookupTableRows
      }
    );
  }

  public updateManagedLookupRows(lookupTableId: string, orgId: string, lookupTableRows: ILookupTableRowUpdated[]): Observable<IManagedLookupAddUpdateResponse> {
    return this.secureHttpClient.patch(
      `${this.configurationService.getApiUrl()}/lookups/managedLookups/managedLookupTable/${lookupTableId}`,
      {
        organizationId: orgId,
        updateData: lookupTableRows
      }
    );
  }

  public addUpdateManagedLookupRows(lookupTableId: string, orgId: string, lookupTableRowsAdded: ILookupTableRowAdded[], lookupTableRowsUpdated: ILookupTableRowUpdated[]): Observable<IManagedLookupAddUpdateResponse[]> {
    return forkJoin(
      lookupTableRowsAdded.length > 0 ? this.addManagedLookupDataRow(lookupTableId, lookupTableRowsAdded) : of({ result_code: 0 }),
      lookupTableRowsUpdated.length > 0 ? this.updateManagedLookupRows(lookupTableId, orgId, lookupTableRowsUpdated) : of({ result_code: 0 })
    );
  }

  public getLookupUsage(lookupTableId: string, organizationId: string): Observable<any> {
    return this.secureHttpClient.get(
      `${this.configurationService.getApiUrl()}/lookups/managedLookups/getLookupUsage/${lookupTableId}/organization/${organizationId}`
    );
  }

  public getManagedLookupsFindPeople(): Observable<any> {
    return this.secureHttpClient.get(`${this.configurationService.getApiUrl()}/lookups/managedLookups/getAllManagedLookups`);
  }

}
