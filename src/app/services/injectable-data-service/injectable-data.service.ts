import { Injectable } from '@angular/core';

@Injectable()
export class InjectableDataService<T> {

  constructor(public data: T) { }
}
