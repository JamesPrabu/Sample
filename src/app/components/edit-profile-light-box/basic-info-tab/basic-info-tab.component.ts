import { Component, EventEmitter, Injector, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { NgbDateParserFormatter, NgbDatepickerConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventTypes } from 'src/app/models/events/event-types';
import { IEventParameters, IEventPerson } from 'src/app/models/events/events';
import { IUserInfo } from 'src/app/models/IUserInfo/IUserInfo';
import { ILookupDisplayRow, ILookupTableRow, IMultiSelectLookupAttributes, IUpdatedLookupItems, LookupTableId } from 'src/app/models/managed-lookups/managed-lookups';
import { MobileCarriers } from 'src/app/models/mobile-carrier/mobile-carrier';
import { IReligiousAffiliation } from 'src/app/models/ReligiousAffiliation/religious-affiliation';
import { StaticType } from 'src/app/models/static-type/static-type';
import { ITermsOfChristianFaith } from 'src/app/models/terms-of-christian-faith/terms-of-christian-faith';
import { SubscriptionArray } from 'src/app/models/utils/subscription-array';
import { Utils } from 'src/app/models/utils/utils';
import { NgbCustomDateFormatter } from 'src/app/services/date/ngb-custom-date-formatter';
import { EventsService } from 'src/app/services/events/events.service';
import { FormGroupKeyService } from 'src/app/services/form-group-keys/form-group-key.service';
import { MobileCarrierService } from 'src/app/services/mobile-carrier/mobile-carrier.service';
import { ReligiousAffiliationService } from 'src/app/services/religious-affiliation/religious-affiliation.service';
import { StaticTypesService } from 'src/app/services/static-types/static-types.service';
import { TermsOfChristianFaithService } from 'src/app/services/terms-of-christian-faith/terms-of-christian-faith.service';

@Component({
  selector: 'app-basic-info-tab',
  templateUrl: './basic-info-tab.component.html',
  styleUrls: ['./basic-info-tab.component.scss'],
  providers: [{ provide: NgbDateParserFormatter, useClass: NgbCustomDateFormatter }]
})
export class BasicInfoTabComponent implements OnInit, OnChanges, OnDestroy {

  @Input() public formGroup: FormGroup;
  @Input() public regions: ILookupTableRow[];
  @Input() public eventParameters: IEventParameters;
  @Input() public currentUserInfo: IUserInfo;
  @Input() public personSpiritualGifts: ILookupDisplayRow[];
  @Input() public personStrengths: ILookupDisplayRow[];
  @Input() public personInterests: ILookupDisplayRow[];
  @Input() public personSkills: ILookupDisplayRow[];

  @Output() spiritualGiftsChanged: EventEmitter<ILookupDisplayRow[]> = new EventEmitter<ILookupDisplayRow[]>();
  @Output() strengthsChanged: EventEmitter<ILookupDisplayRow[]> = new EventEmitter<ILookupDisplayRow[]>();
  @Output() interestsChanged: EventEmitter<ILookupDisplayRow[]> = new EventEmitter<ILookupDisplayRow[]>();
  @Output() skillsChanged: EventEmitter<ILookupDisplayRow[]> = new EventEmitter<ILookupDisplayRow[]>();

  public readonly mobileFieldsRetired: boolean = true;
  public readonly spiritualGiftLookupAttributes: IMultiSelectLookupAttributes = {
    lookupTableId: LookupTableId.Public_SpiritualGifts,
    modifyModalTitle: 'Spiritual Gifts',
    mergeUrlPath: 'mergeSpiritualGifts'
  };
  public readonly strengthLookupAttributes: IMultiSelectLookupAttributes = {
    lookupTableId: LookupTableId.Public_Strengths,
    modifyModalTitle: 'Strengths',
    mergeUrlPath: 'mergeStrengths'
  };
  public readonly interestLookupAttributes: IMultiSelectLookupAttributes = {
    lookupTableId: LookupTableId.Public_Interests,
    modifyModalTitle: 'Interests',
    mergeUrlPath: 'mergeInterests'
  };
  public readonly skillLookupAttributes: IMultiSelectLookupAttributes = {
    lookupTableId: LookupTableId.Public_Skills,
    modifyModalTitle: 'Skills',
    mergeUrlPath: 'mergeSkills'
  };
  public emailError = false;
  public maxYear: { year: number; month: number; day: number; };
  public minYear: { year: number; month: number; day: number; };
  public preferredContact: StaticType[];
  public keys = FormGroupKeyService.Profile;
  public mobileCarrierList: MobileCarriers[];
  public religiousAffiliations: IReligiousAffiliation[];
  public termsOfChristianFaith: ITermsOfChristianFaith[];
  private subscriptions: SubscriptionArray = new SubscriptionArray();
  public regionTitle1: string = 'Regions can be used to group your parishioners by geographic areas.';
  public regionTitle2: string = 'Regions can be used to group your parishioners by geographic areas. To define your regions, go to Settings | Lookups';
  private eventSessionPublicId: string = undefined;
  private eventRetreatId: string = undefined;
  private eventGrowGroupId: string = undefined;


  public get preferredContactFormArray(): FormArray {
    return this.formGroup.controls[this.keys.PREFERRED_CONTACT] as FormArray;
  }

  public get sendEmailTitle(): string {
    return (this.hasEmailAddress ? 'Send email' : 'Valid email address required to send message');
  }

  public get sendTextTitle(): string {
    return (this.hasPhoneNumber ? 'Send text' : 'Valid phone number required to send message');
  }

  public get logCallTitle(): string {
    return (this.hasPhoneNumber ? 'Log call' : 'Valid phone number required to log a call');
  }

  public get logMeetingTitle(): string {
    return 'Log meeting';
  }

  public get hasPersonId(): boolean {
    return Boolean(this.eventParameters && this.eventParameters.personId);
  }

  public get hasEmailAddress(): boolean {
    return ((Utils.StringIsEmpty(this.formGroup.controls[this.keys.EMAIL_ADDRESS].value) === false) &&
      this.formGroup.controls[this.keys.EMAIL_ADDRESS].valid) && this.hasPersonId;
  }

  public get hasPhoneNumber(): boolean {
    return ((Utils.StringIsEmpty(this.formGroup.controls[this.keys.PHONE_NUMBER].value) === false) &&
      this.formGroup.controls[this.keys.PHONE_NUMBER].valid) && this.hasPersonId;
  }

  public get personId(): string {
    let currentId: string = undefined;
    if (this.eventParameters) {
      currentId = this.eventParameters.personId
    }
    return currentId;
  }
  constructor(
    public ngbDatepickerConfig: NgbDatepickerConfig,
    private preferredContactService: StaticTypesService,
    public mobileCarrierService: MobileCarrierService,
    public religiousAffiliationService: ReligiousAffiliationService,
    public termsOfChristianFaithService: TermsOfChristianFaithService,
    private eventsService: EventsService,
    private ngbModal: NgbModal,
  ) {
    this.ngbDatepickerConfig.firstDayOfWeek = 7;
    this.preferredContact = this.preferredContactService.staticLookUpTypes;

    const today = new Date();
    this.maxYear = { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };
    this.minYear = { year: 1900, month: 1, day: 1 };

    this.subscriptions.push(
      this.mobileCarrierService.getAll().subscribe(data => {
        this.mobileCarrierList = data;
        this.mobileCarrierList.push({ pk_id: 'OTHER', carrier_name: 'Other - Not Listed' });
      }),
      religiousAffiliationService.getReligiousAffiliationsByOrganization().subscribe(data => {
        this.religiousAffiliations = data;
      }),
      termsOfChristianFaithService.getTermsOfChristianFaithByOrganization().subscribe(data => {
        this.termsOfChristianFaith = data;
      })
    );
  }

  ngOnChanges() {
    if (this.regions !== undefined && !this.regions) {
      this.formGroup.get(this.keys.REGION).disable();
      this.formGroup.get(this.keys.REGION).setValue(null);
    }
  }

  ngOnInit() {
    this.setEventExperienceIds();
  }

  public get formControls() {
    return this.formGroup.controls;
  }

  public get isInvalidEmail(): boolean {
    return this.formControls[this.keys.EMAIL_ADDRESS].errors &&  this.formControls[this.keys.EMAIL_ADDRESS].errors.invalidEmail;
  }

  private setEventExperienceIds(): void {
    if (this.eventParameters) {
      if (this.eventParameters.origin) {
        if (this.eventParameters.origin === 'session') {
          this.eventSessionPublicId = this.eventParameters.originId;
        }
        if (this.eventParameters.origin === 'retreat') {
          this.eventRetreatId = this.eventParameters.originId;
        }
        if (this.eventParameters.origin === 'growGroup') {
          this.eventGrowGroupId = this.eventParameters.originId;
        }
      }
    }
  }

  public preventWhiteSpace(event: any): void {
    if (event) {
      const charCode = (event.which) ? event.which : event.keyCode;
      if (charCode === 32) {
        event.preventDefault();
      }
    }
  }

  public sendEmailOrText(messageType: string) {
    // const toAddress = [];
    // const toPhoneAddress = [];
    // const eventPersons: IEventPerson[] = [];
    // if (messageType === 'email' && !Utils.StringIsEmpty(this.formGroup.controls[this.keys.EMAIL_ADDRESS].value)) {
    //   eventPersons.push({ person_id: this.eventParameters.personId });
    //   toAddress.push(this.formGroup.controls[this.keys.EMAIL_ADDRESS].value);
    // }
    // if (messageType === 'text' && !Utils.StringIsEmpty(this.formGroup.controls[this.keys.PHONE_NUMBER].value)) {
    //   eventPersons.push({ person_id: this.eventParameters.personId });
    //   toPhoneAddress.push(this.formGroup.controls[this.keys.PHONE_NUMBER].value);
    // }

    // this.subscriptions.push(
    //   this.eventsService.insertEvent(
    //     (messageType === 'text' ? EventTypes.const_TextId : EventTypes.const_EmailId),
    //     eventPersons,
    //     `BasicInfoTabComponent.sendEmailOrText.${messageType}`,
    //     undefined,
    //     this.eventSessionPublicId,
    //     this.eventRetreatId,
    //     this.eventGrowGroupId
    //   ).subscribe((eventResult: any) => {
    //     const peopleEmailCommunication = new EmailCommunication();
    //     peopleEmailCommunication.to_address = toAddress;
    //     peopleEmailCommunication.to_phone = toPhoneAddress;

    //     const modal = this.ngbModal.open(EmailCommunicationLightBoxComponent, {
    //       injector: Injector.create({
    //         providers: [{
    //           provide: EmailCommunicationFormGroupService,
    //           useValue: new EmailCommunicationFormGroupService(peopleEmailCommunication)
    //         }]
    //       }),
    //       centered: true,
    //       size: 'lg',
    //       backdrop: 'static',
    //       keyboard: false
    //     });
    //     modal.componentInstance.eventId = eventResult.eventId;
    //     modal.componentInstance.controlType = messageType;
    //   })
    // );
  }

  public logCallButton_Click() {
    // const eventPersons: IEventPerson[] = [{ person_id: this.eventParameters.personId }];

    // this.subscriptions.push(
    //   this.eventsService.insertEvent(
    //     EventTypes.const_LogPhoneCallId,
    //     eventPersons,
    //     `BasicInfoTabComponent.logCallButton_Click.LogPhoneCall`,
    //     undefined,
    //     this.eventSessionPublicId,
    //     this.eventRetreatId,
    //     this.eventGrowGroupId
    //   ).subscribe((eventResult: any) => {
    //     const modal = this.ngbModal.open(LogPhoneCallComponent, {
    //       centered: true,
    //       size: 'lg',
    //       backdrop: 'static',
    //       keyboard: false
    //     });

    //     modal.componentInstance.logPhoneCall = {
    //       eventId: eventResult.eventId,
    //       personId: this.eventParameters.personId,
    //       firstName: this.formGroup.controls[this.keys.FIRST_NAME].value,
    //       lastName: this.formGroup.controls[this.keys.LAST_NAME].value,
    //       phoneNumber: this.formGroup.controls[this.keys.PHONE_NUMBER].value
    //     };
    //     modal.componentInstance.mode = 'add';
    //   })
    // );
  }

  public logMeetingButton_Click() {
    // const eventPersons: IEventPerson[] = [{ person_id: this.eventParameters.personId }];

    // this.subscriptions.push(
    //   this.eventsService.insertEvent(
    //     EventTypes.const_LogMeetingId,
    //     eventPersons,
    //     `BasicInfoTabComponent.logMeetingButton_Click.LogMeeting`,
    //     undefined,
    //     this.eventSessionPublicId,
    //     this.eventRetreatId,
    //     this.eventGrowGroupId
    //   ).subscribe((eventResult: any) => {
    //     const modal = this.ngbModal.open(LogMeetingComponent, {
    //       centered: true,
    //       size: 'lg',
    //       backdrop: 'static',
    //       keyboard: false
    //     });
    //     modal.componentInstance.logMeeting = {
    //       eventId: eventResult.eventId,
    //       personId: this.eventParameters.personId,
    //       firstName: this.formGroup.controls[this.keys.FIRST_NAME].value,
    //       lastName: this.formGroup.controls[this.keys.LAST_NAME].value
    //     };
    //     modal.componentInstance.mode = 'add';
    //   })
    // );
  }

  public spiritualGifts_Changed(updatedLookupItems: IUpdatedLookupItems): void {
    this.personSpiritualGifts = updatedLookupItems.lookupItems;
    if (!updatedLookupItems.isItemsAreSaved) {
      this.formGroup.markAsDirty();
    }
    this.spiritualGiftsChanged.emit(this.personSpiritualGifts);
  }

  public strengths_Changed(updatedLookupItems: IUpdatedLookupItems): void {
    this.personStrengths = updatedLookupItems.lookupItems;
    if (!updatedLookupItems.isItemsAreSaved) {
      this.formGroup.markAsDirty();
    }
    this.strengthsChanged.emit(this.personStrengths);
  }

  public interests_Changed(updatedLookupItems: IUpdatedLookupItems): void {
    this.personInterests = updatedLookupItems.lookupItems;
    if (!updatedLookupItems.isItemsAreSaved) {
      this.formGroup.markAsDirty();
    }
    this.interestsChanged.emit(this.personInterests);
  }

  public skills_Changed(updatedLookupItems: IUpdatedLookupItems): void {
    this.personSkills = updatedLookupItems.lookupItems;
    if (!updatedLookupItems.isItemsAreSaved) {
      this.formGroup.markAsDirty();
    }
    this.skillsChanged.emit(this.personSkills);
  }

  ngOnDestroy(): void {
    this.subscriptions.destroy();
  }
}