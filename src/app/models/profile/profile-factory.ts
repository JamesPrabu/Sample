import { Injectable } from '@angular/core';
import { Person } from '../person/person';
import { PersonFactory } from '../person/person-factory';
import { Profile } from './profile';

@Injectable({
    providedIn: 'root'
  })
  export class ProfileFactory {

    constructor(
        public personFactory: PersonFactory
      ) {
      }

      buildPersonProfile(jsonData: Person): Profile {
        let person = this.personFactory.buildFromJson(jsonData);
        return new Profile(person);
      }      

      build(jsonData: IProfileBackendData): Profile {

        let person = this.personFactory.buildFromJson(jsonData.person);
              
        return new Profile(
          person
        );
      }

  }

  export interface IProfileBackendData {
    person: Person;
  }
