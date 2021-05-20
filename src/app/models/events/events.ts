export interface IEventPerson {
    person_id: string;
  }
  
  export interface IEventParameters {
    personId: string;
    origin?: 'session' | 'retreat' | 'growGroup';
    originId?: string;
  }
  
  export interface IEventContent {
    event_body: string;
    event_date_time: string;
    event_status: string;
    event_subject: string;
    event_type: string;
    event_type_id: number;
    experience_name: string;
    recipient_count: string;
  }
  
  export interface IPersonCRMEvent {
    event_id: string;
    event_timestamp: string;
    experience_name: string;
    event_type: string;
    person_id: string;
    last_name: string;
    first_name: string;
    phone_number: string;
    event_subject: string;
    event_status: string;
  }
  
  export interface IEventLogCall {
    event_reason: string;
    event_outcome:string;
    event_timestamp: string;
    event_body :string
  }
  
  export interface IEventLogMeeting {
    event_body: string;
    event_duration: string;
    event_subject: string;
    event_timestamp: string;
  }
  