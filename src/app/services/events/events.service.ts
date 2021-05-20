import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEventContent, IEventLogCall, IEventLogMeeting, IEventPerson, IPersonCRMEvent } from 'src/app/models/events/events';
import { ConfigurationService } from '../configuration/configuration.service';
import { SecureHttpClient } from '../secure-http-client/secure-http-client';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(
    private httpClient: SecureHttpClient,
    private configurationService: ConfigurationService
  ) {
  }

  public insertEvent(
    eventTypeId: number,
    eventPersons: IEventPerson[],
    eventLocation?: string,
    eventHistoryResponse?: any,
    sessionPublicId?: string,
    retreatId?: string,
    growGroupId?: string
  ): Observable<any> {
    return this.httpClient.post(`${this.configurationService.getApiUrl()}/crm/events`, {
      events: {
        eventTypeId,
        eventPersons,
        eventLocation,
        eventHistoryResponse,
        sessionPublicId,
        retreatId,
        growGroupId
      }
    });
  }

  public getEventContents(eventId: string): Observable<IEventContent[]> {
    return this.httpClient.get(`${this.configurationService.getApiUrl()}/crm/events/${eventId}/contents`);
  }

  public getEventRecipients(eventId: string): Observable<any> {
    return this.httpClient.get(`${this.configurationService.getApiUrl()}/crm/events/${eventId}/recipients`);
  }

  public getEventCommunicationHistoryByUser(): Observable<any> {
    return this.httpClient.get(`${this.configurationService.getApiUrl()}/crm/events/communication`);
  }

  public recordEventSubmit(
    eventId: string, eventStatus: string, eventTimestamp: Date, eventBody: any,
    eventSubject?: string, eventReason?: string, eventOutcome?: string, eventDuration?: string, eventResponse?: any
  ): Observable<any> {
    return this.httpClient.patch(`${this.configurationService.getApiUrl()}/crm/events/${eventId}/submit`, {
      eventStatus: eventStatus,
      eventTimestamp: eventTimestamp,
      eventBody: eventBody,
      eventSubject: eventSubject,
      eventReason: eventReason,
      eventOutcome: eventOutcome,
      eventDuration: eventDuration,
      eventResponse: eventResponse
    });
  }

  public recordEventEnd(eventId: string, eventStatus: string, eventResponse?: any, eventTimestamp?: Date): Observable<any>  {
    return this.httpClient.patch(`${this.configurationService.getApiUrl()}/crm/events/${eventId}/end`, {
      eventStatus: eventStatus,
      eventResponse: eventResponse,
    });
  }

  public getCRMEventsByPerson(personId: string): Observable<IPersonCRMEvent[]> {
    return this.httpClient.get(`${this.configurationService.getApiUrl()}/crm/events/person/${personId}`);
  }

  public getLogCallByEventId(eventId: string): Observable<IEventLogCall> {
    return this.httpClient.get(`${this.configurationService.getApiUrl()}/crm/events/logCall/${eventId}`);
  }

  public getLogMeetingByEventId(eventId: string): Observable<IEventLogMeeting> {
    return this.httpClient.get(`${this.configurationService.getApiUrl()}/crm/events/logMeeting/${eventId}`);
  }

}
