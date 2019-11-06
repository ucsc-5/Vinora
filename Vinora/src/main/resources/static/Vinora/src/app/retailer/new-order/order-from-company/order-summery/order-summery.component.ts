import { Component, OnInit } from '@angular/core';
import { OrderItem, ItemService, Item } from 'src/app/service/item.service';
import { OrderService } from 'src/app/service/order.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-order-summery',
  templateUrl: './order-summery.component.html',
  styleUrls: ['./order-summery.component.css']
})
export class OrderSummeryComponent implements OnInit {
  orderItems:Observable<OrderItem[]>;
  companyId:string;
  // mailUrl = "https://us-central1-vinora-dc8a2.cloudfunctions.net/retailerRemoveItems";
  myUrl="https://us-central1-vinora-dc8a2.cloudfunctions.net/getCartItems";


  constructor(private http: HttpClient,private fns: AngularFireFunctions,private itemService:ItemService ,private orderService:OrderService, private route:ActivatedRoute,private afs: AngularFirestore) { }


  ngOnInit() {

    this.route.params.subscribe((param:Params)=>{
      this.companyId = param['companyId'];
    });
    this.orderItems= this.orderService.getItemsFromOrderByCompanyId(this.companyId);
  } 

  async onRemove(item:OrderItem){

    this.http.post(this.myUrl,item.quantity).subscribe(res=>{
      console.log(res);
    })

    // getCartItems

    // const callable = await this.fns.httpsCallable('getCartItems');

    // callable({quantity: item.quantity,rootId: item.rootId}).subscribe(
    //   (response)=>{
    //        console.log(response);
      // });

  }

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  
  swalWithBootstrapButtons.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then((result) => {
    if (result.value) {
      swalWithBootstrapButtons.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelled',
        'Your imaginary file is safe :)',
        'error'
      )
    }
  })
}
