
export class Stock{
    key: string;
    managerName: string;
    managerNic: string;
    stockId: number;
    stockName: string;
    email: string;
    address: string;
    contactNumber: string;
    imagePath: string;
    state: string;

    public constructor(stockName:string,managerId:string,managerName:string,email: string, address:string, contactNumber: string){
        this.managerName=managerName;
        this.managerNic=managerId;
        this.stockName=stockName;
        this.email=email;
        this.address=address;
        this.contactNumber=contactNumber;
        this.state= "0";
    }

}