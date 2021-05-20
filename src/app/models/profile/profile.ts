import { Person } from '../person/person';

export class Profile {
  public person: Person = null;
//   public session: { participants: ProfileSessionParticipant[], volunteers: ProfileSessionVolunteer[] } = null;
//   public retreat: { participants: ProfileRetreatParticipant[], volunteers: ProfileRetreatVolunteer[] } = null;
//   public growGroup: { members: ProfileGrowGroupMember[] } = null;
  // public personRoleHistory?: IViewPersonRolesHistory[] = null;

  constructor(
    person: Person,
    // session?: { participants: ProfileSessionParticipant[], volunteers: ProfileSessionVolunteer[] },
    // retreat?: { participants: ProfileRetreatParticipant[], volunteers: ProfileRetreatVolunteer[] },
    // growGroup?: { members: ProfileGrowGroupMember[] },
    // personRoleHistory?: IViewPersonRolesHistory[]
  ) {
    this.person = person;
    // this.session = session || {participants: [], volunteers: []};
    // this.retreat = retreat || {participants: [], volunteers: []};
    // this.growGroup = growGroup || {members: []};
    // this.personRoleHistory = personRoleHistory;
  }
}