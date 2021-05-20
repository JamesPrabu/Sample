import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormGroupKeyService {

  public static Common: any = {
    FIRST_NAME: 'first-name',
    LAST_NAME: 'last-name',
    EMAIL_ADDRESS: 'email-address',
    PHONE_NUMBER: 'phone-number',
    GENDER: 'gender'
  };

  public static Profile: any = {
    FIRST_NAME: FormGroupKeyService.Common.FIRST_NAME,
    LAST_NAME: FormGroupKeyService.Common.LAST_NAME,
    PHONE_NUMBER: FormGroupKeyService.Common.PHONE_NUMBER,
    EMAIL_ADDRESS: FormGroupKeyService.Common.EMAIL_ADDRESS,
    SKILLS: 'skills',
    PARISH: 'parish',
    DATE_OF_BIRTH: 'date-of-birth',
    GENDER: FormGroupKeyService.Common.GENDER,
    DIETARY_RESTRICTIONS: 'dietary-restrictions',
    PREFERRED_CONTACT: 'preferred-contact',
    MOBILE_CARRIER: 'mobile_carrier',
    OTHER_CARRIER: 'other_mobile_carrier',
    SESSION_VOLUNTEER_EXPERIENCES: 'session_volunteer_experiences',
    SESSION_PARTICIPANT_EXPERIENCES: 'session_participant_experiences',
    RETREAT_VOLUNTEER_EXPERIENCES: 'retreat_volunteer_experiences',
    RETREAT_PARTICIPANT_EXPERIENCES: 'retreat_participant_experiences',
    GROW_MEMBER_EXPERIENCES: 'grow_member_experiences',
    RELIGIOUS_AFFILIATION: 'religious-affiliation',
    TERMS_OF_CHRISTIAN_FAITH: 'terms-of-christian-faith',
    REGION: 'region',
    SPIRITUAL_GIFTS: 'spiritual-gifts',
    STRENGTHS: 'strengths',
    INTERESTS: 'interests',
    SKILL: 'skill'
  };
}
