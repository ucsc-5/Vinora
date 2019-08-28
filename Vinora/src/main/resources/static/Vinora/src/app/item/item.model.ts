export class Item {
    public id: number;
    public name: string;
    public brand: string;
    public quantity: number;
    public retail_price: number;
    public wholesale_price: number;
    public state: string;
    public imagePath: string;
    public brandImagePath: string;
    public description: string;

    constructor(id: number, name: string, brand: string, description: string, imagePath: string, brandImagePath: string ){
        this.id = id;
        this.name = name;
        this.brand = brand;
        this.description = description;
        this.imagePath = imagePath;
        this.brandImagePath = brandImagePath;
    }
}    