import { Component, OnInit, Injector } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HeaderTitleService } from 'src/app/services/header-title.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
// import 'rxjs/add/operator/catch';
import { InjectableDataService } from 'src/app/services/injectable-data-service/injectable-data.service';
import { ConfirmDeleteRecordLightboxComponent } from '../light-boxes/confirm-delete-record-lightbox/confirm-delete-record-lightbox.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertMessageService } from 'src/app/services/alert-message/alert-message.service';
import { Constants } from 'src/app/constants/constants';
import { IDeletePerson, Person } from 'src/app/models/person/person';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Profile } from 'src/app/models/profile/profile';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { ToastrService } from 'ngx-toastr';
import { EditProfileLightBoxComponent } from '../edit-profile-light-box/edit-profile-light-box.component';
import { FormBuilder } from '@angular/forms';
import { InjectablePersonService } from 'src/app/services/injectable-person/injectable-person.service';
import { ProfileFormGroupService } from 'src/app/services/profile-form-group/profile-form-group.service';
import { Spirituality } from 'src/app/models/spirituality/spirituality';
// import { ToastrService } from 'ngx-toastr/toastr/toastr.service';


@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})



export class PeopleComponent implements OnInit {
  // public profiles: any = [{first_name: 'kumar', last_name: 'ram', email_address: 'test@gmail.com', phone_number: '3241234123'},
  // {first_name: 'Arun', last_name: 'Sekar', email_address: 'arun@gmail.com', phone_number: '5678923455'}];

  public profiles: Profile[];
  public listData: { spiritualityList: Spirituality[], roles: string[] };
  private peopleCount: number = 0;
  public selectedPeople: any[];
  public filteredEnabled: boolean = false;
  public filteredSelectAllPeopleData = [];
  // profiles.first_name = 'ram';

  constructor(public title: Title, public headerTitleService: HeaderTitleService, private http: HttpClient, private ngbModal: NgbModal, 
    private alertMessageService: AlertMessageService, public activatedRoute: ActivatedRoute, private spinner: NgxSpinnerService, 
    private profileService: ProfileService, private toastr: ToastrService) { // 
    this.selectedPeople = [];
    activatedRoute.data.subscribe((data) => {
      // console.log('Got data ', data.profiles)
      this.profiles = data.profiles;

      this.spinner.hide();
    });
   }

  ngOnInit() {
    this.title.setTitle('People');
    this.headerTitleService.title = 'People';
    // this.getPeople();
    // this.profiles.splice(0,1);
    // console.log('outer => ', this.profiles);
    // const data = this.http.get('http://localhost:3001/getPeople'); //.catch((err: HttpErrorResponse) => {
    // //   // simple logging, but you can do a lot more, see below
    // //   console.error('An error occurred:', err.error);
    // // });

    // // console.log('outer2 => ', data);
    // data.subscribe(
    //   data1 => {
    //   this.profiles = data1;
    //   this.peopleCount = this.profiles.length;
    //   },
    //   error => console.log('oops--> ', this.errorHandler(error))
    //   );
  }

  // private getPeople() {
  //   const data = this.http.get('http://localhost:3001/getPeople');
  //   data.subscribe(
  //     data1 => {
  //     this.profiles = data1;
  //     this.peopleCount = this.profiles.length;
  //     },
  //     error => console.log('oops--> ', this.errorHandler(error))
  //     );
  // }

  private errorHandler(error: HttpErrorResponse) {
    return error.error;
  }

  public openAddModal() {
    const injectablePersonService = new InjectablePersonService(Person.createPersonEmptyClass());
    const personFormGroupService = new ProfileFormGroupService(new Profile(Person.createPersonEmptyClass()), new FormBuilder());
    const injectableDataService = new InjectableDataService(this.listData);

    const lightbox = this.createEditPersonLightbox(injectablePersonService, personFormGroupService, injectableDataService);

    lightbox.result.then(() => {
      this.alertMessageService.show('success', 'Saved!', Constants.toastDurationSuccess);
      this.rebuildTable();
    }).catch((error: string) => {
      if (error === 'error') {
        this.alertMessageService.show('danger', 'Failed to Save!', Constants.toastDurationFail);
      }
    });

  }

  public openEditModal(profile: Profile) {
  }
  
  private createEditPersonLightbox(
    injectablePersonService: InjectablePersonService,
    personFormGroupService: ProfileFormGroupService,
    injectableDataService: InjectableDataService<{ spiritualityList: Spirituality[], roles: string[] }>
  ): NgbModalRef {
    return this.ngbModal.open(EditProfileLightBoxComponent,
      {
        injector: Injector.create({
          providers: [
            { provide: ProfileFormGroupService, useValue: personFormGroupService },
            { provide: InjectablePersonService, useValue: injectablePersonService },
            { provide: InjectableDataService, useValue: injectableDataService }
          ]
        }),
        centered: true,
        size: 'lg',
        windowClass: 'modal-xxl',
        backdrop: 'static',
        keyboard: false
      });
  }
  

  public toggleSelectAllPeople(event) {
    event.target.checked ? this.selectedPeople = [...this.profiles] : this.selectedPeople = [];
    if (event.target.checked) {
      if (!this.filteredEnabled) {
        this.selectedPeople = [...this.profiles];
        this.filteredSelectAllPeopleData = [];
      } else {
        this.selectedPeople = [...this.filteredSelectAllPeopleData];
      }
    } else {
      this.selectedPeople = [];
    }
  }

  public togglePeopleSelectedItem(selectedData: any, event) {
    event.target.checked ? this.selectedPeople.push(selectedData) : this.selectedPeople.splice(this.selectedPeople.indexOf(selectedData), 1);
  }

  public deleteButton_Click(): void {
    // this.alertMessageService.show('success', 'Deleted!', Constants.toastDurationSuccess);
    // this.toastr.success("Hello, I'm the delete toastr message.")
    // console.log('Person ==> ', this.selectedPeople);
    if (this.selectedPeople.length === 1) {
      let deletePersion: IDeletePerson[] = [{pk_id: this.selectedPeople[0].person.pk_id, first_name: this.selectedPeople[0].person.first_name, last_name: this.selectedPeople[0].person.last_name}];
      // deletePersion[0].pk_id = 'this.selectedPeople[0].pk_id';
      //public sort: SortDescriptor[] = [{ field: 'person.last_name', dir: 'asc' }];
      // deletePersion.last_name = this.selectedPeople[0].last_name;
      // deletePersion.first_name = this.selectedPeople[0].first_name;
      
      const injectableDataService = new InjectableDataService({
        singlePerson: deletePersion
      });
      const modal = this.ngbModal.open(ConfirmDeleteRecordLightboxComponent, {
        injector: Injector.create({ providers: [{ provide: InjectableDataService, useValue: injectableDataService }] }),
        centered: true,
        size: 'lg',
        backdrop: 'static',
        keyboard: false
      });
      modal.result.then(() => {
        // console.log('Success');
        this.alertMessageService.show('success', 'Deleted!', Constants.toastDurationSuccess);
        this.rebuildTable();
      }).catch((error: string) => {
        // console.log('Error=> ', error);
        if (error === 'error') {
          this.alertMessageService.show('danger', 'Failed to delete the selected record!', Constants.toastDurationFail);
        }
      });
    }
    }
  
    private rebuildTable() {
      // this.getPeople();
      this.profileService.get().subscribe((profiles) => {
        this.profiles = profiles;// this.sortService.rerunLastSort(profiles);
        this.selectedPeople = [];
        // setTimeout(() => {
        //   if (this.filteredEnabled) {
        //     this.filteredSelectAllPeopleData = [...filterBy(this.profiles,this.findPeopleGrid.filter.filters)];
        //   } else {
        //     this.filteredSelectAllPeopleData = [];
        //   }
        // }, 200)
      });
    }
  
  // private confirmDeleteRecordLightbox(selectedPerson: Person) {
  //   const injectableDataService = new InjectableDataService({
  //     person: selectedPerson
  //   });
  //   const modal = this.ngbModal.open(ConfirmDeleteRecordLightboxComponent, {
  //     injector: Injector.create({ providers: [{ provide: InjectableDataService, useValue: injectableDataService, }] }),
  //     centered: true,
  //     size: 'lg',
  //     backdrop: 'static',
  //     keyboard: false
  //   });
  //   modal.result.then(() => {
  //     this.alertMessageService.show('success', 'Deleted!', Constants.toastDurationSuccess);
  //     this.rebuildTable();
  //   }).catch((error: string) => {
  //     if (error === 'error') {
  //       this.alertMessageService.show('danger', 'Failed to delete the selected record!', Constants.toastDurationFail);
  //     }
  //   });
  // }

  sendEmailShouldBeEnabled(): boolean {
    return false;
  }

  sendTextShouldBeEnabled(): boolean {
    return false;
  }

  // sendTextShouldBeEnabled

  public sendEmailOrText(controlType: string) {
  }

  import() {
  }

  export() {
  }

  public get disableDeleteButton(): boolean {
    return false;
  }

  public get showDeleteButtonFeature(): boolean {
    return true;
  }


}

interface singlePerson {
  pk_id: string;
  first_name: string;
  last_name: string;
}

interface person {
  first_name: string;
  last_name: string;
  email_address: string;
  phone_number: string;
}
