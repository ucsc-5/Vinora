export class Vehicle {
    public id: string;
    public number_plate: string;
    public vehicle_model: string;
    public owner_name: string;
    public owner_mobile: number;
    public owner_address: string;
   

    public constructor(number_plate:string,vehicle_model:string,owner_name: string,owner_mobile:number,owner_address:string){ 
        this.number_plate = number_plate;
        this.vehicle_model = vehicle_model;
        this.owner_name = owner_name;
        this.owner_mobile = owner_mobile;
        this.owner_address= owner_address; 
       
    }
    
}    