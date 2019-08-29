import { Manager } from '../manager/manager.model';

export class Stock extends Manager{

    

    stockId: number;
    name: string;
    email: string;
    address: string;
    contactNumber: string;
    imagePath:string;

    public constructor(id:number,name:string,managerId:string,managerName:string,email: string, address:string, contactNumber: string,imagePath:string){
        super(managerId,managerName);
        this.stockId=id;
        this.name=name;
        this.email=email;
        this.address=address;
        this.contactNumber=contactNumber;
        this.imagePath;
    }

}