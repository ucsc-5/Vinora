
export class Company{
    public key: string;
    public managerName: string;
    public managerNic: string;
    public stockId: number;
    public stockName: string;
    public email: string;
    public address: string;
    public contactNumber: string;
    public imagePath: string;
    public state: string;

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