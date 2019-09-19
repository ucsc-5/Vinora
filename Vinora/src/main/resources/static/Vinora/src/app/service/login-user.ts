export class LoginUser {
    key : string
    email : string
    type: string
    registerState: number

    constructor(email:string,type:string){
        this.email=email;
        this.type=type;
        this.registerState=0;
    }
}
