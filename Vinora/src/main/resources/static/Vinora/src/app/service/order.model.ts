

export class Order {

    public key : string

    public createDate : Date;
    public purchesDate : Date;
    public acceptedDate : Date;
    public deliveredDate : Date;
    public retailerKey: string;
    public stockmanagerKey: string;
    public salesRefKey: string;

    
    
    constructor(currentdate:Date){
        this.createDate=currentdate;
    }

   
}