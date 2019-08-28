export class Item {
    public id: number;
    public name: string;
    public brand: string;
    public quantity: number;
    public unit_price: number;
   
    public state: string;
    public imagePath: string;
    public brandImagePath: string;
    public description: string;

    
    public newItem(name: string, imagePath: string,brand: string,  brandImagePath: string,unit_price: number = 0, quantity: number= 0,state: string= "new",description: string= "none" ){
        this.id; 
        this.name = name;
        this.brand = brand;
        this.description = description;
        this.imagePath = imagePath;
        this.brandImagePath = brandImagePath;
        this.quantity = quantity; 
        this.state = state;
    }
}    