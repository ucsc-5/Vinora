export class LoginUser {
    key : string
    userId: string
    email : string
    type: string
    registerState: boolean

    constructor(type:string,uid:string,email:string){
        this.email=email;
        this.key=uid;
        this.type=type;
        this.registerState = false;
    }
}
