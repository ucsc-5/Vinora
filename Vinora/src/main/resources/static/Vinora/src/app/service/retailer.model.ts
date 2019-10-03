import { Order } from './order.model';
import { Observable } from 'rxjs';

export class Retailer {
    shopName: string;
    email: string;
    address: string;
    contactNumber: string;
    state: string;
    userId: string;

    orders: Order[];
    
    constructor(shopname:string,email:string,address:string,contactNumber:string,uid:string){
        this.shopName=shopname;
        this.address=address;
        this.email=email;
        this.contactNumber=contactNumber;
        this.state="notRegistered";
        this.userId=uid;
    }

    setOrder(order:Order){
        this.orders.push(order);
    }

}
