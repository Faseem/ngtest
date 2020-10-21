import { Injectable } from '@angular/core';
import {KeycloakService} from "keycloak-angular";
import { HttpClient } from '@angular/common/http';
import { PageDataService } from './page-data.service';
import { Location } from '@angular/common';
import { UserProfile, UnitsMapper } from './models';
import { PosClientConfig } from '../data/pos-client-config';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AppConfService {
  static startupStrings:any;
  static hardcoded:any;
  constructor(
    private ks:KeycloakService,
    private http: HttpClient,
    private pds:PageDataService,
    private location:Location
  ) { }

  initializeApp(): Promise<any>{
    return new Promise((resolve,reject)=>{
      this.http.get(
        this.location.prepareExternalUrl
        ("assets/config/property.json")
      )
      .toPromise()
      .then((prop:any)=>{
        const properties = prop;
        AppConfService.startupStrings=properties;
        this.http.get(
          this.location.prepareExternalUrl
          ("assets/config/hardcoded.json")
        )
        .toPromise()
        .then((prop:any)=>{
          const hardcoded = prop;
          AppConfService.hardcoded=hardcoded;
          this.ks.init({
            config:{
              url:properties.keycloak.url,
              realm:properties.keycloak.realm,
              clientId:properties.keycloak.clientId
            },
            initOptions:{
              onLoad:"check-sso",
              silentCheckSsoRedirectUri:window.location.origin+"/assets/html/silent-check-sso.html"
            },
            enableBearerInterceptor:true,
            bearerExcludedUrls:[
              "/assets",
            ]
          }).then(data=>{
            console.log("Keycloak initialization :"+data);
            this.initializeUserData();
          }).catch(err=>{
            reject(err);
          });
        }).catch(err=>{
          reject(err);
        });
      }).catch(err=>{
        reject(err);
      });
    });
  }
  async initializeUserData(){
    if(await this.ks.isLoggedIn()){
      let userProfile:UserProfile | any = await this.ks.loadUserProfile();
      if(userProfile && userProfile['attributes']){
        this.pds.setUserProfile(userProfile);
      }
      /* this.http.get(
        AppConfService.startupStrings.posServiceUrl+
        '/pos-client-conf'
      ).subscribe(data=>{
        let clientConf:PosClientConfig|any = data;
        this.pds.setClientConfig(clientConf);
      },err=>{
        console.log(err);
      }); */

      forkJoin(
        this.http.get(
          AppConfService.startupStrings.posServiceUrl+
          '/pos-client-conf'
        ).pipe(catchError(err=>of([]))),
        this.http.get(
          AppConfService.startupStrings.posServiceUrl+
          '/units-mappers'
        ).pipe(catchError(err=>of([])))
      ).subscribe((data:any)=>{
        let clientConf:PosClientConfig|any = data[0];
        this.pds.setClientConfig(clientConf);
        let unitMappers:UnitsMapper[]=data[1];
        this.pds.setUnitMappers(unitMappers);
      },
      err=>{
        console.log(err);
      });
    }
  }
}
