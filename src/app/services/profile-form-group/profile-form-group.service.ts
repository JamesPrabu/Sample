import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CustomValidators } from 'src/app/helpers/validators/validator/validator';
import { Profile } from 'src/app/models/profile/profile';
import { FormGroupKeyService } from '../form-group-keys/form-group-key.service';
import { FormValidators } from '../validators/form-validators';

@Injectable({
  providedIn: 'root'
})
export class ProfileFormGroupService {
  private _keys = FormGroupKeyService.Profile;
  // private _sessionParticipantKeys = FormGroupKeyService.ProfileSessionParticipant;
  // private _sessionVolunteerKeys = FormGroupKeyService.ProfileSessionVolunteer;
  // private _retreatParticipantKeys = FormGroupKeyService.ProfileRetreatParticipant;
  // private _retreatVolunteerKeys = FormGroupKeyService.ProfileRetreatVolunteer;
  // private _growGroupMemberKeys = FormGroupKeyService.ProfileGrowGroupMember;

  public formGroup: FormGroup;
  private _adjustmentForZeroVsOneBasedMonthIndex = 1;

  constructor(public profile: Profile, public fb: FormBuilder) {
    this.formGroup = this.buildProfileFormGroup();
  }

  updateProfile() {
    const profile = new Profile(this.profile.person);

    const dateOfBirth = this.formGroup.get(this._keys.DATE_OF_BIRTH).value;
    profile.person.first_name = this.formGroup.get(this._keys.FIRST_NAME).value;
    profile.person.last_name = this.formGroup.get(this._keys.LAST_NAME).value;
    profile.person.phone_number = this.formGroup.get(this._keys.PHONE_NUMBER).value;
    profile.person.email_address = this.formGroup.get(this._keys.EMAIL_ADDRESS.trim()).value;
    profile.person.skills = this.formGroup.get(this._keys.SKILLS).value;
    profile.person.parish = this.formGroup.get(this._keys.PARISH).value;
    profile.person.date_of_birth = dateOfBirth ? this.convertDisplayDateToDate(dateOfBirth) : null;
    profile.person.gender = this.formGroup.get(this._keys.GENDER).value;
    profile.person.dietary_restrictions = this.formGroup.get(this._keys.DIETARY_RESTRICTIONS).value;
    profile.person.preferred_contact = this.formGroup.get(this._keys.PREFERRED_CONTACT).value;
    profile.person.mobile_carrier = this.formGroup.get(this._keys.MOBILE_CARRIER).value;
    profile.person.other_mobile_carrier = this.formGroup.get(this._keys.OTHER_CARRIER).value;
    profile.person.religious_affiliation_id = this.formGroup.get(this._keys.RELIGIOUS_AFFILIATION).value;
    profile.person.terms_of_christian_faith_id = this.formGroup.get(this._keys.TERMS_OF_CHRISTIAN_FAITH).value;
    profile.person.region = this.formGroup.get(this._keys.REGION).value;
    profile.person.spiritualGifts = this.formGroup.get(this._keys.SPIRITUAL_GIFTS).value;
    profile.person.strengths = this.formGroup.get(this._keys.STRENGTHS).value;
    profile.person.interests = this.formGroup.get(this._keys.INTERESTS).value;
    profile.person.skill = this.formGroup.get(this._keys.SKILL).value;

    // if (this.profile.session.volunteers.length > 0) {
    //   const sessionVolunteerArray = this.formGroup.controls[this._keys.SESSION_VOLUNTEER_EXPERIENCES] as FormArray;
    //   sessionVolunteerArray.controls.forEach(control => {
    //     const profileSessionVolunteer = new ProfileSessionVolunteer();
    //     profileSessionVolunteer.public_id = control.get(this._sessionVolunteerKeys.PUBLIC_ID).value;
    //     profileSessionVolunteer.fk_group_id = control.get(this._sessionVolunteerKeys.GROUP_ID).value;
    //     profileSessionVolunteer.preferred_roles = control.get(this._sessionVolunteerKeys.PREFERRED_ROLES).value;
    //     profileSessionVolunteer.primary_role = control.get(this._sessionVolunteerKeys.PRIMARY_ROLE).value;
    //     profileSessionVolunteer.secondary_role = control.get(this._sessionVolunteerKeys.SECONDARY_ROLE).value;
    //     profileSessionVolunteer.comments = control.get(this._sessionVolunteerKeys.COMMENTS).value;
    //     profileSessionVolunteer.is_verified = control.get(this._sessionVolunteerKeys.VOLUNTEER_IS_VERIFIED).value;
    //     profile.session.volunteers.push(profileSessionVolunteer);
    //   });
    // }

    // if (this.profile.session.participants.length > 0) {
    //   const sessionParticipantArray = this.formGroup.controls[this._keys.SESSION_PARTICIPANT_EXPERIENCES] as FormArray;
    //   sessionParticipantArray.controls.forEach(control => {
    //     const profileSessionParticipant = new ProfileSessionParticipant();
    //     profileSessionParticipant.public_id = control.get(this._sessionParticipantKeys.PARTICIPANT_PUBLIC_ID).value;
    //     profileSessionParticipant.fk_group_id = control.get(this._sessionParticipantKeys.PARTICIPANT_GROUP_ID).value;
    //     profileSessionParticipant.alpha_attended = control.get(this._sessionParticipantKeys.ALPHA_ATTENDED).value;
    //     profileSessionParticipant.child_care_request = control.get(this._sessionParticipantKeys.CHILD_CARE_REQUEST).value;
    //     profileSessionParticipant.reference_source = control.get(this._sessionParticipantKeys.REFERENCE_SOURCE).value;
    //     profileSessionParticipant.seating_notes = control.get(this._sessionParticipantKeys.SEAT_WITH).value;
    //     profileSessionParticipant.comments = control.get(this._sessionParticipantKeys.PARTICIPANT_COMMENTS).value;
    //     profileSessionParticipant.fk_spirituality_id = control.get(this._sessionParticipantKeys.FK_SPIRITUALITY_ID).value;
    //     profileSessionParticipant.is_verified = control.get(this._sessionParticipantKeys.PARTICIPANT_IS_VERIFIED).value;
    //     profileSessionParticipant.age_range = control.get(this._sessionParticipantKeys.AGE_RANGE).value;
    //     profileSessionParticipant.withdrawn_timestamp = control.get(this._sessionParticipantKeys.WITHDRAWN_TIMESTAMP).value;
    //     profile.session.participants.push(profileSessionParticipant);
    //   });
    // }

    // if (this.profile.retreat.volunteers.length > 0) {
    //   const retreatVolunteerArray = this.formGroup.controls[this._keys.RETREAT_VOLUNTEER_EXPERIENCES] as FormArray;
    //   retreatVolunteerArray.controls.forEach(control => {
    //     const profileRetreatVolunteer = new ProfileRetreatVolunteer();
    //     profileRetreatVolunteer.pk_id = control.get(this._retreatVolunteerKeys.PK_ID).value;
    //     profileRetreatVolunteer.preferred_roles = control.get(this._retreatVolunteerKeys.PREFERRED_ROLES).value;
    //     profileRetreatVolunteer.primary_role_name = control.get(this._retreatVolunteerKeys.PRIMARY_ROLE).value;
    //     profileRetreatVolunteer.secondary_role_name = control.get(this._retreatVolunteerKeys.SECONDARY_ROLE).value;
    //     profileRetreatVolunteer.comments = control.get(this._retreatVolunteerKeys.COMMENTS).value;
    //     profile.retreat.volunteers.push(profileRetreatVolunteer);
    //   });
    // }

    // if (this.profile.retreat.participants.length > 0) {
    //   const retreatParticipantArray = this.formGroup.controls[this._keys.RETREAT_PARTICIPANT_EXPERIENCES] as FormArray;
    //   retreatParticipantArray.controls.forEach(control => {
    //     const profileRetreatParticipant = new ProfileRetreatParticipant();
    //     profileRetreatParticipant.public_id = control.get(this._retreatParticipantKeys.PUBLIC_ID).value;
    //     profileRetreatParticipant.comments = control.get(this._retreatParticipantKeys.COMMENTS).value;
    //     profileRetreatParticipant.confirmed_attending = control.get(this._retreatParticipantKeys.CONFIRMED_ATTENDING).value;
    //     profileRetreatParticipant.fk_spirituality_id = control.get(this._retreatParticipantKeys.FK_SPIRITUALITY_ID).value;
    //     profileRetreatParticipant.child_care_request = control.get(this._retreatParticipantKeys.CHILD_CARE_REQUEST).value;
    //     profile.retreat.participants.push(profileRetreatParticipant);
    //   });
    // }

    // if (this.profile.growGroup.members.length > 0) {
    //   const growMemberArray = this.formGroup.controls[this._keys.GROW_MEMBER_EXPERIENCES] as FormArray;
    //   growMemberArray.controls.forEach(control => {
    //     const profileGrowGroupMember = new ProfileGrowGroupMember();
    //     profileGrowGroupMember.group_member_id = control.get(this._growGroupMemberKeys.GROUP_MEMBER_ID).value;
    //     profileGrowGroupMember.role_id = control.get(this._growGroupMemberKeys.ROLE_ID).value;
    //     profileGrowGroupMember.primary_contact = control.get(this._growGroupMemberKeys.PRIMARY_CONTACT).value;
    //     profileGrowGroupMember.invited_by = control.get(this._growGroupMemberKeys.INVITED_BY).value;
    //     profileGrowGroupMember.invited = control.get(this._growGroupMemberKeys.INVITED).value;
    //     profileGrowGroupMember.child_care_request = control.get(this._growGroupMemberKeys.CHILD_CARE_REQUEST).value;
    //     profileGrowGroupMember.comments_notes_id = control.get(this._growGroupMemberKeys.COMMENTS_NOTES_ID).value;
    //     profileGrowGroupMember.group_member_comments = control.get(this._growGroupMemberKeys.GROUP_MEMBER_COMMENTS).value;
    //     profileGrowGroupMember.active_member_status = control.get(this._growGroupMemberKeys.ACTIVE_MEMBER_STATUS).value;
    //     profileGrowGroupMember.fk_spirituality_id = control.get(this._growGroupMemberKeys.FK_SPIRITUALITY_ID).value;
    //     profile.growGroup.members.push(profileGrowGroupMember);
    //   });
    // }
    return profile;
  }

  private buildProfileFormGroup() {
    let personFormGroup = this.fb.group({}, { validators: FormValidators.personContactValidator });
    personFormGroup.addControl(this._keys.FIRST_NAME, new FormControl(this.profile.person.first_name, [Validators.required, FormValidators.alphaNumericValidator]));
    personFormGroup.addControl(this._keys.LAST_NAME, new FormControl(this.profile.person.last_name, [Validators.required, FormValidators.alphaNumericValidator]));
    personFormGroup.addControl(this._keys.PHONE_NUMBER, new FormControl(this.profile.person.phone_number));
    personFormGroup.addControl(this._keys.EMAIL_ADDRESS, new FormControl(this.profile.person.email_address, {validators: [CustomValidators.validateEmail], updateOn: 'change'}));
    personFormGroup.addControl(this._keys.SKILLS, new FormControl(this.profile.person.skills));
    personFormGroup.addControl(this._keys.PARISH, new FormControl(this.profile.person.parish));
    personFormGroup.addControl(this._keys.DATE_OF_BIRTH, new FormControl(this.convertDateToDisplayDate(this.profile.person.date_of_birth)));
    personFormGroup.addControl(this._keys.GENDER, new FormControl(this.profile.person.gender));
    personFormGroup.addControl(this._keys.DIETARY_RESTRICTIONS, new FormControl(this.profile.person.dietary_restrictions));
    personFormGroup.addControl(this._keys.PREFERRED_CONTACT, new FormArray([
      new FormControl(this.profile.person.preferred_contact[0]),
      new FormControl(this.profile.person.preferred_contact[1]),
      new FormControl(this.profile.person.preferred_contact[2])
    ]));
    personFormGroup.addControl(this._keys.MOBILE_CARRIER, new FormControl(this.profile.person.mobile_carrier));
    personFormGroup.addControl(this._keys.OTHER_CARRIER, new FormControl(this.profile.person.other_mobile_carrier));
    personFormGroup.addControl(this._keys.RELIGIOUS_AFFILIATION, new FormControl(this.profile.person.religious_affiliation_id));
    personFormGroup.addControl(this._keys.TERMS_OF_CHRISTIAN_FAITH, new FormControl(this.profile.person.terms_of_christian_faith_id));
    personFormGroup.addControl(this._keys.REGION, new FormControl(this.profile.person.region));

    personFormGroup.addControl(this._keys.SPIRITUAL_GIFTS, new FormControl(this.profile.person.spiritualGifts));
    personFormGroup.addControl(this._keys.STRENGTHS, new FormControl(this.profile.person.strengths));
    personFormGroup.addControl(this._keys.INTERESTS, new FormControl(this.profile.person.interests));
    personFormGroup.addControl(this._keys.SKILL, new FormControl(this.profile.person.skill));

    // if (this.profile.session.volunteers.length > 0) {
    //   personFormGroup.addControl(this._keys.SESSION_VOLUNTEER_EXPERIENCES, new FormArray([]));
    //   const sessionVolunteerArray = personFormGroup.controls[this._keys.SESSION_VOLUNTEER_EXPERIENCES] as FormArray;
    //   this.profile.session.volunteers.forEach(volunteer => {
    //     const sessionVolunteerFormGroup: FormGroup = this.fb.group({});
    //     sessionVolunteerFormGroup.addControl(this._sessionVolunteerKeys.PUBLIC_ID, new FormControl(volunteer.public_id));
    //     sessionVolunteerFormGroup.addControl(this._sessionVolunteerKeys.GROUP_ID, new FormControl(volunteer.fk_group_id));
    //     sessionVolunteerFormGroup.addControl(this._sessionVolunteerKeys.PREFERRED_ROLES, new FormControl(volunteer.preferred_roles));
    //     sessionVolunteerFormGroup.addControl(this._sessionVolunteerKeys.PRIMARY_ROLE, new FormControl(volunteer.primary_role));
    //     sessionVolunteerFormGroup.addControl(this._sessionVolunteerKeys.SECONDARY_ROLE, new FormControl(volunteer.secondary_role));
    //     sessionVolunteerFormGroup.addControl(this._sessionVolunteerKeys.COMMENTS, new FormControl(volunteer.comments));
    //     sessionVolunteerFormGroup.addControl(this._sessionVolunteerKeys.VOLUNTEER_IS_VERIFIED, new FormControl(volunteer.is_verified));
    //     sessionVolunteerArray.push(sessionVolunteerFormGroup);
    //   });
    // }

    // if (this.profile.session.participants.length > 0) {
    //   personFormGroup.addControl(this._keys.SESSION_PARTICIPANT_EXPERIENCES, new FormArray([]));
    //   const sessionParticipantArray = personFormGroup.controls[this._keys.SESSION_PARTICIPANT_EXPERIENCES] as FormArray;
    //   this.profile.session.participants.forEach(participant => {
    //     const sessionParticipantFormGroup: FormGroup = this.fb.group({});
    //     sessionParticipantFormGroup.addControl(this._sessionParticipantKeys.PARTICIPANT_PUBLIC_ID, new FormControl(participant.public_id));
    //     sessionParticipantFormGroup.addControl(this._sessionParticipantKeys.PARTICIPANT_GROUP_ID, new FormControl(participant.fk_group_id));
    //     sessionParticipantFormGroup.addControl(this._sessionParticipantKeys.ALPHA_ATTENDED, new FormControl(participant.alpha_attended));
    //     sessionParticipantFormGroup.addControl(this._sessionParticipantKeys.CHILD_CARE_REQUEST, new FormControl(participant.child_care_request));
    //     sessionParticipantFormGroup.addControl(this._sessionParticipantKeys.SEAT_WITH, new FormControl(participant.seating_notes));
    //     sessionParticipantFormGroup.addControl(this._sessionParticipantKeys.REFERENCE_SOURCE, new FormControl(participant.reference_source));
    //     sessionParticipantFormGroup.addControl(this._sessionParticipantKeys.PARTICIPANT_COMMENTS, new FormControl(participant.comments));
    //     sessionParticipantFormGroup.addControl(this._sessionParticipantKeys.FK_SPIRITUALITY_ID, new FormControl(participant.fk_spirituality_id));
    //     sessionParticipantFormGroup.addControl(this._sessionParticipantKeys.PARTICIPANT_IS_VERIFIED, new FormControl(participant.is_verified));
    //     sessionParticipantFormGroup.addControl(this._sessionParticipantKeys.AGE_RANGE, new FormControl(participant.age_range));
    //     sessionParticipantFormGroup.addControl(this._sessionParticipantKeys.WITHDRAWN_TIMESTAMP, new FormControl(participant.withdrawn_timestamp));
    //     sessionParticipantArray.push(sessionParticipantFormGroup);
    //   });
    // }

    // if (this.profile.retreat.participants.length > 0) {
    //   personFormGroup.addControl(this._keys.RETREAT_PARTICIPANT_EXPERIENCES, new FormArray([]));
    //   const retreatParticipantArray = personFormGroup.controls[this._keys.RETREAT_PARTICIPANT_EXPERIENCES] as FormArray;
    //   this.profile.retreat.participants.forEach(participant => {
    //     const retreatParticipantFormGroup = this.fb.group({});
    //     retreatParticipantFormGroup.addControl(this._retreatParticipantKeys.PUBLIC_ID, new FormControl(participant.public_id));
    //     retreatParticipantFormGroup.addControl(this._retreatParticipantKeys.COMMENTS, new FormControl(participant.comments));
    //     retreatParticipantFormGroup.addControl(this._retreatParticipantKeys.CONFIRMED_ATTENDING, new FormControl(participant.confirmed_attending));
    //     retreatParticipantFormGroup.addControl(this._retreatParticipantKeys.FK_SPIRITUALITY_ID, new FormControl(participant.fk_spirituality_id));
    //     retreatParticipantFormGroup.addControl(this._retreatParticipantKeys.CHILD_CARE_REQUEST, new FormControl(participant.child_care_request));
    //     retreatParticipantArray.push(retreatParticipantFormGroup);
    //   });
    // }

    // if (this.profile.retreat.volunteers.length > 0) {
    //   personFormGroup.addControl(this._keys.RETREAT_VOLUNTEER_EXPERIENCES, new FormArray([]));
    //   const retreatVolunteerArray = personFormGroup.controls[this._keys.RETREAT_VOLUNTEER_EXPERIENCES] as FormArray;
    //   this.profile.retreat.volunteers.forEach(volunteer => {
    //     const retreatVolunteerFormGroup = this.fb.group({});
    //     retreatVolunteerFormGroup.addControl(this._retreatVolunteerKeys.PK_ID, new FormControl(volunteer.pk_id));
    //     retreatVolunteerFormGroup.addControl(this._retreatVolunteerKeys.PREFERRED_ROLES, new FormControl(volunteer.preferred_roles));
    //     retreatVolunteerFormGroup.addControl(this._retreatVolunteerKeys.PRIMARY_ROLE, new FormControl(volunteer.primary_role_name));
    //     retreatVolunteerFormGroup.addControl(this._retreatVolunteerKeys.SECONDARY_ROLE, new FormControl(volunteer.secondary_role_name));
    //     retreatVolunteerFormGroup.addControl(this._retreatVolunteerKeys.COMMENTS, new FormControl(volunteer.comments));
    //     retreatVolunteerArray.push(retreatVolunteerFormGroup);
    //   });
    // }

    // if (this.profile.growGroup.members.length > 0) {
    //   personFormGroup.addControl(this._keys.GROW_MEMBER_EXPERIENCES, new FormArray([]));
    //   const growMemberArray = personFormGroup.controls[this._keys.GROW_MEMBER_EXPERIENCES] as FormArray;
    //   this.profile.growGroup.members.forEach(member => {
    //     const growMemberFormGroup = this.fb.group({});
    //     growMemberFormGroup.addControl(this._growGroupMemberKeys.GROUP_MEMBER_ID, new FormControl(member.group_member_id));
    //     growMemberFormGroup.addControl(this._growGroupMemberKeys.ROLE_ID, new FormControl(member.role_id));
    //     growMemberFormGroup.addControl(this._growGroupMemberKeys.PRIMARY_CONTACT, new FormControl(member.primary_contact));
    //     growMemberFormGroup.addControl(this._growGroupMemberKeys.INVITED_BY, new FormControl(member.invited_by));
    //     growMemberFormGroup.addControl(this._growGroupMemberKeys.INVITED, new FormControl(member.invited));
    //     growMemberFormGroup.addControl(this._growGroupMemberKeys.CHILD_CARE_REQUEST, new FormControl(member.child_care_request));
    //     growMemberFormGroup.addControl(this._growGroupMemberKeys.COMMENTS_NOTES_ID, new FormControl(member.comments_notes_id));
    //     growMemberFormGroup.addControl(this._growGroupMemberKeys.GROUP_MEMBER_COMMENTS, new FormControl(member.group_member_comments));
    //     growMemberFormGroup.addControl(this._growGroupMemberKeys.ACTIVE_MEMBER_STATUS, new FormControl(member.active_member_status));
    //     growMemberFormGroup.addControl(this._growGroupMemberKeys.FK_SPIRITUALITY_ID, new FormControl(member.fk_spirituality_id));
    //     growMemberArray.push(growMemberFormGroup);
    //   });
    // }

    return personFormGroup;
  }

  private convertDisplayDateToDate(displayDate: NgbDateStruct): Date {
    return new Date(displayDate.year, (displayDate.month - this._adjustmentForZeroVsOneBasedMonthIndex), displayDate.day);
  }

  private convertDateToDisplayDate(date: Date): NgbDateStruct {
    let dob = new Date(date);
    return date ? {
      year: dob.getFullYear(),
      month: (dob.getMonth() + this._adjustmentForZeroVsOneBasedMonthIndex),
      day: dob.getDate()
    } : null;
  }

}
