import { Item } from './item.model';

export class Order {

    public key : string

    public createDate : Date;
    public purchesDate : Date;
    public acceptedDate : Date;
    public deliveredDate : Date;
    public retailerKey: string;
    public stockmanagerKey: string;
    public salesRefKey: string;

    public items:Item[];
    
    constructor(currentdate:Date){
        this.createDate=currentdate;
    }

    public addItem(item:Item){
        console.log("from order");
        this.items.push(item)
        console.log(this.items.length);
    }
    
}