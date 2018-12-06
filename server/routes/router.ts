import {TenantsController} from "../controllers/tenants.controller";
import {Router} from "express";


export class MyRouter {
    constructor() {
    }

    initRoutes() {
        let router = Router();
        let tenantsCtrl = new TenantsController(router);
    }
}