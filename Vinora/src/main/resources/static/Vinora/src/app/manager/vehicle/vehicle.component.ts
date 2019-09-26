import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../service/vehicle.service';
import { Vehicle } from './vehicle.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, AngularFireList  } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  myvehicle:Vehicle;
  vehiclesRef: AngularFireList<any>;
  vehicles: Observable<any[]>;

  constructor(private route:ActivatedRoute, private router: Router, private vehicleService:VehicleService,private db: AngularFireDatabase) {
    
   }

  ngOnInit() {
    this.vehiclesRef = this.db.list('vehicles');
    this.vehicles = this.vehiclesRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }


  // onRegisterVehicle(){
  //   const myVehicle;
  //   this.vehicleService.storeVehicle(m)
  // }

  onRegister(){
    this.router.navigate(['register'],{relativeTo: this.route})
  }
}
