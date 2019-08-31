export class Item {
    public id: number;
    public itemName: string;
    public brand: string;
    public quantity: number;
    public unitPrice: number;
    public state: string;
    public imagePath: string;
    public brandImagePath: string;
    public description: string;

    public constructor(id:number,itemName:string,brand:string,description: string,imagePath:string,brandImagePath:string,quantity:number,unitPrice:number,state:string){
        this.id=id; 
        this.itemName = itemName;
        this.brand = brand;
        this.description = description;
        this.imagePath = imagePath;
        this.brandImagePath = brandImagePath;
        this.quantity = quantity;
        this.unitPrice = unitPrice; 
        this.state = state;
    }
    
    public newItem(id:number,itemName:string,brand:string,description: string,imagePath:string,brandImagePath:string,quantity:number,unitPrice:number,state:string){
        this.id=id; 
        this.itemName = itemName;
        this.brand = brand;
        this.description = description;
        this.imagePath = imagePath;
        this.brandImagePath = brandImagePath;
        this.quantity = quantity;
        this.unitPrice = unitPrice; 
        this.state = state;
    }
}    