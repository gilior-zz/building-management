import {TenantsController} from "../controllers/tenants.controller";
import {Express, Router} from "express";
import {PaymentsController} from "../controllers/payments.controller";
import {LoginController} from "../controllers/login.controller";
import {ApartmentController} from "../controllers/apartments.controller";
import {MetadataController} from "../controllers/metadata.controller";
import {WorksController} from "../controllers/works.controller";


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

        router = Router();
        new LoginController(router);
        app.use('/api/login', router);

        router = Router();
        new ApartmentController(router);
        app.use('/api/apartments', router);

        router = Router();
        new MetadataController(router);
        app.use('/api/metadata', router);

        router = Router();
        new WorksController(router);
        app.use('/api/works', router);
    }
}

export const router = new MyRouter();