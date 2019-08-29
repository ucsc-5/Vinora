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

    public constructor(){
        
    }
    
    public newItem({ name, imagePath, brand, brandImagePath, unit_price = 0, quantity = 0, state = "new", description = "none" }: { name: string; imagePath: string; brand: string; brandImagePath: string; unit_price?: number; quantity?: number; state?: string; description?: string; }){
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