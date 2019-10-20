import { Order } from './order.model';
import { Observable } from 'rxjs';

export class Retailer {
    shopName: string;
    email: string;
    address: string;
    contactNumber: string;
    state: string;
    userId: string;
    key: string;
    url:string;
    file:File;
    
    
    constructor(shopname:string,email:string,address:string,contactNumber:string,uid:string){
        this.shopName=shopname;
        this.address=address;
        this.email=email;
        this.contactNumber=contactNumber;
        this.state="notRegistered";
        this.userId=uid;
    }

    setUrl(url:string){
        this.url=url;
    }

    setFile(file:File){
        this.file= file;
    }

}
