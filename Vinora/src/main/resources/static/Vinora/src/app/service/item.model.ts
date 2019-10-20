export class Item {
    public key: string;
    public itemName: string;
    public brand: string;
    public quantity: number;
    public unitPrice: number;
    public state: string;
    public itemImage: File;
    public itemImagePath: string;
    public brandImage: File;
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

    setFile(itemimagePath:File,brandImagePath:File){
        this.itemImage = itemimagePath;
        this.brandImage = brandImagePath;
    }

    setUrlForItemImage(url:string){
        this.itemImagePath=url;
    }

    setUrlForItemBrand(url:string){
        this.brandImagePath=url;
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