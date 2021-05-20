import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IDeletePerson } from 'src/app/models/person/person';
import { InjectableDataService } from 'src/app/services/injectable-data-service/injectable-data.service';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-confirm-delete-record-lightbox',
  templateUrl: './confirm-delete-record-lightbox.component.html',
  styleUrls: ['./confirm-delete-record-lightbox.component.scss']
})
export class ConfirmDeleteRecordLightboxComponent implements OnInit {
  public deletePerson: IDeletePerson;
  
  constructor(
    public activeModal: NgbActiveModal, private http: HttpClient, private profileService: ProfileService,
    public injectableDataService: InjectableDataService<{ singlePerson: IDeletePerson }>
  ) { 
    console.log('this.injectableDataService.data.person ', this.injectableDataService.data.singlePerson)
    this.deletePerson = this.injectableDataService.data.singlePerson[0];
  }
  
  ngOnInit() {
  }

  public confirmDelete_Click(): void {
    console.log('confirm delete ...')
    let statusCode: number = -2;
    const personId = this.deletePerson.pk_id;
    // const data = this.http.get(`http://localhost:3001/${personId}/personSoftDelete`); // /${personId}/personSoftDelete
    // //const data = this.http.get('http://localhost:3001/getPeople');
    // data.subscribe(
    //   data1 => {
    //     // if (statusCode === 0) {
    //       this.activeModal.close();
    //     // } else {
    //     //   this.activeModal.dismiss('error');
    //     // }    
    //   });

    this.profileService.personSoftDelete(this.deletePerson.pk_id).toPromise().then((returnCode: { return_code: number }) => {
      statusCode = returnCode.return_code;
      if (statusCode === 0) {
        this.activeModal.close();
      } else {
        this.activeModal.dismiss('error');
      }    
    }).catch((err: Error) => {
      console.error(err.message);
      this.activeModal.dismiss('error');
    });
  }

}
