export class Retailer {

    shopName: String;
    email: String;
    address: String;
    tel: String;
    state: string;
    
    constructor(shopname:String,email:String,address:String,tel:String,state:String){
        this.shopName=shopname;
        this.address=address;
        this.email=email;
        this.tel=tel;
        this.state="reg";
    }


 }
