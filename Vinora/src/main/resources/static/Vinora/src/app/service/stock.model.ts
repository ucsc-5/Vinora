import { Manager } from './manager.model';


export class Stock extends Manager{

    stockId: number;
    stockName: string;
    email: string;
    address: string;
    contactNumber: string;
    imagePath: string;
    state: number;

    public constructor(stockName:string,managerId:string,managerName:string,email: string, address:string, contactNumber: string){
        super(managerId,managerName);
        this.stockName=stockName;
        this.email=email;
        this.address=address;
        this.contactNumber=contactNumber;
        this.state= 0;
    }

}