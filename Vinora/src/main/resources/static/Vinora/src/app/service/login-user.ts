export class LoginUser {
    
    userId: string
    email : string
    type: string
    registerState: boolean

    constructor(type:string,uid:string,email:string){
        this.email=email;
        this.userId=uid;
        this.type=type;
        this.registerState = false;
    }
}
