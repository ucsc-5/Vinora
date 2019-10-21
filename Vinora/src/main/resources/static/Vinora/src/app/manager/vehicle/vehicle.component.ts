import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../service/vehicle.service';
import { FileUpload  } from '../../uploads/shared/file-upload';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, AngularFireList  } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CompanyService } from 'src/app/service/company.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  myvehicle:FileUpload;

  vehicles: Observable<any[]>;

  companyId

  constructor(private afAuth: AngularFireAuth,private route:ActivatedRoute, private router: Router, private companyServise:CompanyService,private db: AngularFireDatabase) {
    this.companyId= this.afAuth.auth.currentUser.uid;
   }

  ngOnInit() {
    this.vehicles = this.companyServise.getVehicle(this.companyId);
  }


  // onRegisterVehicle(){
  //   const myVehicle;
  //   this.vehicleService.storeVehicle(m)
  // }

  onRegister(){
    this.router.navigate(['register'],{relativeTo: this.route})
  }
}
