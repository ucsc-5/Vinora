
export class Company{
    public key: string;
    public managerName: string;
    public managerNic: string;
    public companyId: number;
    public companyName: string;
    public email: string;
    public address: string;
    public contactNumber: string;
    public imagePath: string;
    public state: string;

    public constructor(companyName:string,managerId:string,managerName:string,email: string, address:string, contactNumber: string){
        this.managerName=managerName;
        this.managerNic=managerId;
        this.companyName=companyName;
        this.email=email;
        this.address=address;
        this.contactNumber=contactNumber;
        this.state= "0";
    }

}