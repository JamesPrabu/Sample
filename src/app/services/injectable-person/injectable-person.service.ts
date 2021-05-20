import { Injectable } from '@angular/core';
import { Person } from 'src/app/models/person/person';

// @Injectable({
//   providedIn: 'root'
// })
export class InjectablePersonService {

  constructor(public person: Person) {

  }

  public getPerson(): Person {
    return new Person(
      this.person.pk_id,
      this.person.first_name,
      this.person.last_name,
      this.person.email_address,
      this.person.phone_number,
      this.person.skills,
      this.person.history,
      this.person.dietary_restrictions,
      this.person.parish,
      this.person.date_of_birth,
      this.person.address,
      this.person.gender,
      this.person.preferred_contact,
      this.person.mobile_carrier,
      this.person.other_mobile_carrier,
      this.person.parish_custom_answer
    );
  }
}
