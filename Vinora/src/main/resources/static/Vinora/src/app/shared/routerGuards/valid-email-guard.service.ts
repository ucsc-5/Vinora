
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute, CanActivateChild } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs/Observable';
import { DialogService } from 'src/app/service/dialog.service';
import { relative } from 'path';



@Injectable()
export class ValidEmailGuardService implements CanActivate,CanActivateChild {
  constructor(private dialogService:DialogService,private afAuth: AngularFireAuth, private router: Router,private route:ActivatedRoute) {

  }

  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<boolean>| Promise<boolean>| boolean {

    return this.afAuth.auth.currentUser.getIdTokenResult().then((idTokenResult)=>{
      if(this.afAuth.auth.currentUser.emailVerified){
        return true
      }else{
        const message=`Veryfy my email address ${this.afAuth.auth.currentUser.email}`
        this.dialogService.openConfirmDialog(message).afterClosed().subscribe(
        res=>{
          if(res){
            this.afAuth.auth.currentUser.sendEmailVerification();
          }else{
            this.router.navigate([],{relativeTo:this.route});    
          }
        }) 
      }
    })
  }

  canActivateChild(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<boolean>| Promise<boolean>| boolean {
    return this.afAuth.auth.currentUser.getIdTokenResult().then((idTokenResult)=>{
      if(this.afAuth.auth.currentUser.emailVerified){
        return true
      }else{
        const message=`Veryfy my email address ${this.afAuth.auth.currentUser.email}`
        this.dialogService.openConfirmDialog(message).afterClosed().subscribe(
        res=>{
          if(res){
            this.afAuth.auth.currentUser.sendEmailVerification();
            this.router.navigate(['/welcomeNewCompany']);   
          }else{
            this.router.navigate(['/welcomeNewCompany']);    
          }
        }) 
      }
    })
  }


}
