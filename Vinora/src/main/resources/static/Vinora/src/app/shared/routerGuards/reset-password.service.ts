import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs/Observable';
import { DialogService } from 'src/app/service/dialog.service';
import { ThrowStmt } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService implements CanActivateChild {
  
  constructor(private afAuth: AngularFireAuth, private router: Router,private dialogService:DialogService) {}

  canActivateChild(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<boolean>| Promise<boolean>| boolean {

    return this.afAuth.auth.currentUser.getIdTokenResult().then((idTokenResult)=>{
      if(idTokenResult.claims.pwd && this.afAuth.auth.currentUser.emailVerified){
        return true
      }else if(!this.afAuth.auth.currentUser.emailVerified){
        const message1=`Veryfy my email address ${this.afAuth.auth.currentUser.email}`;
        this.dialogService.openConfirmDialog(message1).afterClosed().subscribe(
        res=>{
          if(res){
            this.afAuth.auth.currentUser.sendEmailVerification();
            this.router.navigate(['/temporaryWelcome',1]);   
          }else{
           
            this.router.navigate(['/']);    
          }
        }) 
      }else if(!idTokenResult.claims.pswd){

        const message2="Please reset your password!"
        this.dialogService.openPaswordReset(message2).afterClosed().subscribe(
          res=>{
            if(res){
              console.log(res);
              this.router.navigate(['/home/login']);
              return true;
             
            }else{
              this.router.navigate(['/']);  
            }})
      }
    })
  }
}