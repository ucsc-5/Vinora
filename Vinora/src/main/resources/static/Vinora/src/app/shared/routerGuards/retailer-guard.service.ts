
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs/Observable';




@Injectable()
export class RetailerGuardService implements CanActivate {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<boolean>| Promise<boolean>| boolean {

    return this.afAuth.auth.currentUser.getIdTokenResult().then((idTokenResult)=>{
      if(idTokenResult.claims.retailer){
        return true
      }else{
        this.router.navigate(['/'])
      }
    })
  }
}
