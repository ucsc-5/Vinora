import { Stock } from '../service/stock.model';


export class PendigRetailer {
    shopName: String;
    email: String;
    address: String;
    tel: String;
    state: string;
    registeredStocks : Stock[];
    current

    constructor(shopname: String, email: String, address: String, tel: String, state: String) {
        this.shopName = shopname;
        this.address = address;
        this.email = email;
        this.tel = tel;
        this.state = "pending";
    }
}
