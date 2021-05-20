import { Person } from './person';
import { Injectable } from '@angular/core';

export interface PersonJson {
  pk_id: string;
  email_address: string;
  last_name: string;
  phone_number: string;
  first_name: string;
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
  parish_custom_answer: boolean;
  religious_affiliation_id?: string;
  terms_of_christian_faith_id?: string;
  region?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PersonFactory {
  buildAllFromJson(personsJson: any[]): Person[] {
    return personsJson.map((personJson) => {
        // console.log('personfactory  ', personJson)
      return this.buildFromJson(personJson);
    });
  }

  buildFromJson(personJson: PersonJson): Person {
      // console.log('assign place ', personJson)
    let person = new Person(
      personJson.pk_id,
      personJson.first_name,
      personJson.last_name,
      personJson.email_address,
      personJson.phone_number,
      personJson.skills,
      personJson.history,
      personJson.dietary_restrictions,
      personJson.parish,
      personJson.date_of_birth,
      personJson.address,
      personJson.gender,
      personJson.preferred_contact ? personJson.preferred_contact : [false, false, false],
      personJson.mobile_carrier ? personJson.mobile_carrier : null,
      personJson.other_mobile_carrier ? personJson.other_mobile_carrier : '',
      personJson.parish_custom_answer ? personJson.parish_custom_answer : null,
      personJson.religious_affiliation_id ? personJson.religious_affiliation_id : null,
      personJson.terms_of_christian_faith_id ? personJson.terms_of_christian_faith_id : null,
      personJson.region ? personJson.region : null
    );

    return person;
  }
}
