import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { IEventParameters } from 'src/app/models/events/events';
import { IUserInfo } from 'src/app/models/IUserInfo/IUserInfo';
import { ILookupDisplayRow, ILookupTable, ILookupTableRow } from 'src/app/models/managed-lookups/managed-lookups';
import { Person } from 'src/app/models/person/person';
import { Profile } from 'src/app/models/profile/profile';
import { Spirituality } from 'src/app/models/spirituality/spirituality';
import { StaticType } from 'src/app/models/static-type/static-type';
import { SubscriptionArray } from 'src/app/models/utils/subscription-array';
import { BehaviorSubjectService } from 'src/app/services/behavior-subject/behavior-subject.service';
import { ConfigurationService } from 'src/app/services/configuration/configuration.service';
import { FormGroupKeyService } from 'src/app/services/form-group-keys/form-group-key.service';
import { InjectableDataService } from 'src/app/services/injectable-data-service/injectable-data.service';
import { InjectablePersonService } from 'src/app/services/injectable-person/injectable-person.service';
import { ManagedLookupsService } from 'src/app/services/managed-lookups/managed-lookups.service';
import { ProfileFormGroupService } from 'src/app/services/profile-form-group/profile-form-group.service';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { SaveWarningService } from 'src/app/services/save-warning/save-warning.service';

@Component({
  selector: 'app-edit-profile-light-box',
  templateUrl: './edit-profile-light-box.component.html',
  styleUrls: ['./edit-profile-light-box.component.scss']
})
export class EditProfileLightBoxComponent implements OnInit, OnDestroy {
  public readonly tabBasicInfo: number = 0;
  public readonly tabFaithJourney: number = 1;
  public readonly tabJourneyPoints: number = 2;
  public readonly tabCommunications: number = 3;

  public keys = FormGroupKeyService.Profile;
  public lightBoxTabs: { index: number, name: string, id: string }[];
  public selectedLightBoxTab: { index: number, name: string, id: string };
  public selectedProfile: Profile;
  public profileFormGroupService: ProfileFormGroupService;
  public listData: IProfileListData;
  // public rolesHistory: IViewPersonRolesHistory[] = [];
  public disableSave: boolean = false;
  public showButton: boolean;
  public showProfileLightBox: boolean;
  public regions: ILookupTableRow[];
  public eventParameters: IEventParameters;
  private subscriptions: SubscriptionArray = new SubscriptionArray();
  public currentUserInfo: IUserInfo = undefined;
  public personSpiritualGifts: ILookupDisplayRow[] = [];
  public personStrengths: ILookupDisplayRow[] = [];
  public personInterests: ILookupDisplayRow[] = [];
  public personSkills: ILookupDisplayRow[] = [];

  public constructor(
    private configurationService: ConfigurationService,
    private activeModal: NgbActiveModal,
    private profileService: ProfileService,
    private injectablePersonService: InjectablePersonService,
    // public saveWarningService: SaveWarningService,
    private behaviorSubjectService: BehaviorSubjectService,
    // private injectableDataService: InjectableDataService<IProfileListData>,
    // private userPermissionManagerService: UserPermissionManagerService,
    private spinner: NgxSpinnerService,
    private managedLookupsService: ManagedLookupsService
  ) {
    this.showProfileLightBox = true;
    this.showButton = true;
    this.personSpiritualGifts = [];
    this.personStrengths = [];
    this.personInterests = [];
    this.personSkills = [];
    // this.listData = injectableDataService.data;
    this.subscriptions.push(
      this.profileService.getUserInfo().subscribe((userInfo: IUserInfo) => {
        this.currentUserInfo = userInfo;
        if (injectablePersonService.person.pk_id) {
          spinner.show();
          this.subscriptions.push(
            this.profileService.getPersonSpiritualGifts(injectablePersonService.person.pk_id, userInfo.organization_id).subscribe((spiritualGifts: ILookupDisplayRow[]) => {
              this.personSpiritualGifts = spiritualGifts;
              this.subscriptions.push(
                this.profileService.getPersonStrengths(injectablePersonService.person.pk_id, userInfo.organization_id).subscribe((strengths: ILookupDisplayRow[]) => {
                  this.personStrengths = strengths;
                  this.subscriptions.push(
                    this.profileService.getPersonInterests(injectablePersonService.person.pk_id, userInfo.organization_id).subscribe((interests: ILookupDisplayRow[]) => {
                      this.personInterests = interests;
                      this.subscriptions.push(
                        this.profileService.getPersonSkills(injectablePersonService.person.pk_id, userInfo.organization_id).subscribe((skills: ILookupDisplayRow[]) => {
                          this.personSkills = skills;
                          this.subscriptions.push(
                            this.profileService.getProfileByPersonId(injectablePersonService.person.pk_id).subscribe((personSessionInfo: Profile) => {
                              // this.rolesHistory = personSessionInfo.personRoleHistory;
                              this.selectedProfile = personSessionInfo;
                              this.profileFormGroupService = new ProfileFormGroupService(this.selectedProfile, new FormBuilder());
                              // this.applyUserPermission();
                            }, () => {
                              this.activeModal.dismiss('error');
                            }, () => {
                              setTimeout(() => {
                                spinner.hide();
                              }, 500);
                            }),
                            this.managedLookupsService.getManagedLookups().subscribe((lookups: ILookupTable[]) => {
                              const regionLookup: ILookupTable = lookups.find(lookup => lookup.lookup_table_name === 'regions');
                              if (regionLookup) {
                                this.subscriptions.push(this.managedLookupsService.getManagedLookupRows(regionLookup.lookup_table_id, userInfo.organization_id).subscribe((regionRows: ILookupTableRow[]) => {
                                  this.regions = regionRows;
                                }));
                              }
                            })
                          );
                        })
                      );
                    })
                  );
                })
              );
            })
          );
        } else {
          this.selectedProfile = new Profile(Person.createPersonEmptyClass());
          this.profileFormGroupService = new ProfileFormGroupService(this.selectedProfile, new FormBuilder());
        }
      })
    );
    this.getLookupData();
  }

  public ngOnInit(): void {
    this.disableSave = false;
    this.lightBoxTabs = [
      { index: this.tabBasicInfo, name: 'Basic Info', id: 'basic-info-tab' },
      { index: this.tabFaithJourney, name: 'Faith Journey', id: 'faith-journey-tab' },
      { index: this.tabJourneyPoints, name: 'Journey Points', id: 'journey-points-tab' },
      { index: this.tabCommunications, name: 'Communication', id: 'crm-tab' }
    ];
    this.selectedLightBoxTab = this.lightBoxTabs[this.tabBasicInfo];
    this.subscriptions.push(
      this.behaviorSubjectService.getExperience().subscribe((data) => {
        if (data.public_id) {
          this.behaviorSubjectService.roles = this.listData.roles;
          this.selectedLightBoxTab = this.lightBoxTabs[data.tab_index];
        }
      })
    );
  }

  private getLookupData() {
    this.profileService.getUserInfo().subscribe((userInfo: IUserInfo) => {
      this.currentUserInfo = userInfo;
      this.subscriptions.push(this.managedLookupsService.getManagedLookups().subscribe((lookups: ILookupTable[]) => {
        const regionLookup: ILookupTable = lookups.find(lookup => lookup.lookup_table_name === 'regions');
        if (regionLookup) {
          this.subscriptions.push(this.managedLookupsService.getManagedLookupRows(regionLookup.lookup_table_id, userInfo.organization_id).subscribe((regionRows: ILookupTableRow[]) => {
            this.regions = regionRows;
          }));
        }
      }));
    })
  }

  public ngOnDestroy(): void {
    this.subscriptions.destroy();
  }

  public enableTab(index: number): boolean {
    switch (index) {
      case this.tabBasicInfo:
        return true;
      case this.tabFaithJourney:
        return true;
      case this.tabJourneyPoints:
        return true;
      case this.tabCommunications:
        return true;
    }
  }

  public enableTabContent(index: number): boolean {
    switch (index) {
      case this.tabBasicInfo:
        return this.selectedLightBoxTab.index === this.lightBoxTabs[index].index;
      case this.tabFaithJourney:
        return this.selectedLightBoxTab.index === this.lightBoxTabs[index].index;
      case this.tabJourneyPoints:
        return this.selectedLightBoxTab.index === this.lightBoxTabs[index].index;
      case this.tabCommunications:
        return this.selectedLightBoxTab.index === this.lightBoxTabs[index].index;
    }
  }

  public tabSelection(selectedTab): void {
    this.selectedLightBoxTab = selectedTab;
  }

  public getTabFootNotes(): string {
    let footNotes = '';
    switch (this.selectedLightBoxTab.index) {
      case this.tabFaithJourney: {
        footNotes = '* Clicking on an Encounter Group Type will take you to the Encounter Module';
        break;
      }
      case this.tabCommunications: {
        break;
      }
      default: {
        footNotes = '* Denotes required fields';
        break;
      }
    }
    return footNotes;
  }

  public save(): void {
    if (this.disableSave === false) {
      this.disableSave = true;
      const profile = this.profileFormGroupService.updateProfile();

      if (profile.person.mobile_carrier === 'OTHER' || profile.person.mobile_carrier === '') {
        profile.person.mobile_carrier = null;
      } else {
        profile.person.other_mobile_carrier = null;
      }

      if (profile.person.pk_id === '') {
        this.subscriptions.push(
          this.profileService.post(profile).subscribe(() => {
            this.activeModal.close();
          }, () => {
            this.activeModal.dismiss('error');
          })
        );
      } else {
        this.subscriptions.push(
          this.profileService.put(profile).subscribe(() => {
            this.activeModal.close();
            this.disableSave = false;
          }, () => {
            this.activeModal.dismiss('error');
          })
        );
      }
    }
    this.behaviorSubjectService.clearExperience();
  }

  public closeLightBox() {
    // this.saveWarningService.showWarningPopup(this.activeModal, this.profileFormGroupService.formGroup.dirty);
    // this.behaviorSubjectService.clearExperience();
  }

  public saveButtonDisable() {
    if (!this.profileFormGroupService.formGroup.valid || this.profileFormGroupService.formGroup.pristine || this.disableSave) {
      return true;
    } else {
      return false;
    }
  }

  public applyUserPermission() {
    // const userPermission = this.userPermissionManagerService.user_permission;
    // const isEncounterHigherPrivilege = userPermission.encounter_permission.permissionKey >= userPermission.grow_permission.permissionKey;
    // const higherPrivilegeDetail: IPermissionElements = isEncounterHigherPrivilege ? userPermission.encounter_permission : userPermission.grow_permission;
    // if (higherPrivilegeDetail.noPermission) {
    //   this.showProfileLightBox = false;
    //   this.showButton = false;
    // } else if (higherPrivilegeDetail.readOnly) {
    //   this.profileFormGroupService.formGroup.disable();
    //   this.showProfileLightBox = true;
    //   this.showButton = false;
    // } else if (higherPrivilegeDetail.readWrite) {
    //   this.profileFormGroupService.formGroup.enable();
    //   this.showProfileLightBox = true;
    //   this.showButton = true;
    // }
  }

  public spiritualGifts_Changed(spiritualGifts: ILookupDisplayRow[]): void {
    let spiritualGiftIds: string[] = [];
    this.personSpiritualGifts = spiritualGifts;
    spiritualGifts.forEach(spiritualGift => {
      spiritualGiftIds.push(spiritualGift.lookup_id);
    });
    this.profileFormGroupService.formGroup.get(this.keys.SPIRITUAL_GIFTS).setValue(spiritualGiftIds);
  }

  public strengths_Changed(strengths: ILookupDisplayRow[]): void {
    let StrengthIds: string[] = [];
    this.personStrengths = strengths;
    strengths.forEach(strengths => {
      StrengthIds.push(strengths.lookup_id);
    });
    this.profileFormGroupService.formGroup.get(this.keys.STRENGTHS).setValue(StrengthIds);
  }

  public interests_Changed(interests: ILookupDisplayRow[]): void {
    let InterestIds: string[] = [];
    this.personInterests = interests;
    interests.forEach(interests => {
      InterestIds.push(interests.lookup_id);
    });
    this.profileFormGroupService.formGroup.get(this.keys.INTERESTS).setValue(InterestIds);
  }

  public skills_Changed(skills: ILookupDisplayRow[]): void {
    let SkillIds: string[] = [];
    this.personSkills = skills;
    skills.forEach(skills => {
      SkillIds.push(skills.lookup_id);
    });
    this.profileFormGroupService.formGroup.get(this.keys.SKILL).setValue(SkillIds);
  }

}

export interface IProfileListData {
  spiritualityList: Spirituality[];
  roles: string[];
  staticTypes: StaticType[];
}
