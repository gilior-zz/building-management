import {Request, Response, Router} from "express";
import {utility} from "../services/utility";

export class TenantsController {
    constructor(router: Router) {
        router.get('/', this.loadTenants)
    }

    async loadTenants(req: Request, res: Response) {
        utility.loadContentAndSendToClient(req, 'HomePageTextSelect', res);

    }
}