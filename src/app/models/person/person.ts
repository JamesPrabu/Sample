export interface IDeletePerson {
    pk_id: string;
    first_name: string;
    last_name: string;
}

export interface IPerson {
  person_id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email_address: string;
  skills: string;
  history: string;
  dietary_restrictions: string;
  parish: string;
  date_of_birth: Date;
  address: string;
  gender: string;
  preferred_contact: boolean[];
  mobile_carrier: string;
  other_mobile_carrier: string;
  parish_custom_answer?: boolean;
  // religious_affiliation_id?: string;
}

export class Person {

    constructor(
      public pk_id: string,
      public first_name: string,
      public last_name: string,
      public email_address: string,
      public phone_number: string,
      public skills: string,
      public history: string,
      public dietary_restrictions: string,
      public parish: string,
      public date_of_birth: Date,
      public address: string,
      public gender: string,
      public preferred_contact: boolean[],
      public mobile_carrier: string,
      public other_mobile_carrier: string,
      public parish_custom_answer: boolean,
      public religious_affiliation_id?: string,
      public terms_of_christian_faith_id?: string,
      public region?: string,
      public spiritualGifts?: string[],
      public strengths?: string[],
      public interests?: string[],
      public skill?: string[]
    ) {
    }
  
    static createPersonEmptyClass(): Person {
      return new Person('', '', '', '', '', '', '', '', null, undefined, '', '', [], null, '', null);
    }
  
  }