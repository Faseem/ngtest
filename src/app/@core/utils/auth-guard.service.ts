import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { KeycloakService, KeycloakAuthGuard } from 'keycloak-angular';
import { async } from 'rxjs';
import { AppConfService } from './app-conf.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService extends KeycloakAuthGuard{

  constructor(
    protected router:Router,
    protected ks:KeycloakService
  ) {
    super(router, ks);
  }

  public async isAccessAllowed(
    route:ActivatedRouteSnapshot,
    state: RouterStateSnapshot  
  ){
    //var userLogedIn = await this.ks.isLoggedIn();
    if(!this.authenticated){
      this.ks.login({redirectUri:AppConfService.startupStrings.applicationUrl+state.url});
      return;
    }
    //resolve(true);
    const requiredRoles = route.data.roles;

    // Allow the user to to proceed if no additional roles are required to access the route.
    if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
      return true;
    }

    // Allow the user to proceed if all the required roles are present.
    return (
      requiredRoles.every((role) => this.roles.includes(role))
    );
  }
}
