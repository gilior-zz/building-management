import {Router,Response,Request} from "express";

export class TenantsController{
    constructor(router:Router){
        router.get('/',this.loadTenants)
    }

   async loadTenants(req: Request, res: Response){
       utility.loadContentAndSendToClient(req,'HomePageTextSelect', res)   }
}