import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BehaviorSubjectService {
  private _selectedExperience: BehaviorSubject<IExperienceSubject>;
  roles: string[] = [];

  constructor() {
    this._selectedExperience = new BehaviorSubject({ public_id: '', tab_index: 0 });
  }

  setExperience(value: IExperienceSubject) {
    this._selectedExperience.next(value);
  }

  getExperience(): BehaviorSubject<IExperienceSubject> {
    return this._selectedExperience;
  }

  clearExperience() {
    this._selectedExperience = new BehaviorSubject({ public_id: '', tab_index: 0 });
  }

}

export interface IExperienceSubject {
  public_id: string;
  tab_index: number;
}
