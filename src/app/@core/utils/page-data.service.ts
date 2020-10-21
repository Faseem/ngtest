import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PosClientConfig } from '../data/pos-client-config';
import { UserProfile, UnitsMapper } from './models';

@Injectable({
  providedIn: 'root'
})
export class PageDataService {

  private posClientConfig = new BehaviorSubject(new PosClientConfig());
  currentPosClientConfig = this.posClientConfig.asObservable();

  //private unitMappers: UnitsMapper[];
  private unitMappers: BehaviorSubject<UnitsMapper[]> = <BehaviorSubject<UnitsMapper[]>>new BehaviorSubject([]);
  currentUnitMappers = this.unitMappers.asObservable();

  private userProfile = new BehaviorSubject(new UserProfile());
  currentUserProfile = this.userProfile.asObservable();
  constructor() { }
  setClientConfig(clientConfig:PosClientConfig){
    this.posClientConfig.next(clientConfig);
  }
  setUserProfile(userProfile: any) {
    this.userProfile.next(userProfile);
  }
  setUnitMappers(unitMappers: any[]) {
    this.unitMappers.next(unitMappers)
  }
}
