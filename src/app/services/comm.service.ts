import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';
import { Patient } from '../Patient';

@Injectable()
export class commService {

  // Observable string sources
  private patientObj = new Subject<number>();

  // Observable string streams
  patientAnnounced$ = this.patientObj.asObservable();

  // Service message commands
  announce(patient: number) {
    this.patientObj.next(patient);
  }
}