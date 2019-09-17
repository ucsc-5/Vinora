export class Item {
    public key: string;
    public itemName: string;
    public brand: string;
    public quantity: number;
    public unitPrice: number;
    public state: string;
    public imagePath: File;
    public brandImagePath: string;
    public description: string;
    public category: string;

    public constructor(itemName:string,brand:string,description: string,quantity:number,unitPrice:number,state:string){ 
        this.itemName = itemName;
        this.brand = brand;
        this.description = description;
        this.quantity = quantity;
        this.unitPrice = unitPrice; 
        this.state = state;
    }
    
    // public newItem(id:number,itemName:string,brand:string,description: string,imagePath:File,brandImagePath:string,quantity:number,unitPrice:number,state:string){
    //     this.id=id; 
    //     this.itemName = itemName;
    //     this.brand = brand;
    //     this.description = description;
    //     this.imagePath = imagePath;
    //     this.brandImagePath = brandImagePath;
    //     this.quantity = quantity;
    //     this.unitPrice = unitPrice; 
    //     this.state = state;
    // }
}    