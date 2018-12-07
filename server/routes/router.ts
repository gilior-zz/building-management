import {TenantsController} from "../controllers/tenants.controller";
import {Express, Router} from "express";
import {PaymentsController} from "../controllers/payments.controller";


export class MyRouter {
    constructor() {
    }

    async initRoutes(app: Express) {
        let router = Router();
        new TenantsController(router);
        app.use('/api/tenants', router);

        router = Router();
        new PaymentsController(router);
        app.use('/api/payments', router);
    }
}

export const router = new MyRouter();