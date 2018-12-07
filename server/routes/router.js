"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tenants_controller_1 = require("../controllers/tenants.controller");
const express_1 = require("express");
const payments_controller_1 = require("../controllers/payments.controller");
class MyRouter {
    constructor() {
    }
    initRoutes(app) {
        return __awaiter(this, void 0, void 0, function* () {
            let router = express_1.Router();
            new tenants_controller_1.TenantsController(router);
            app.use('/api/tenants', router);
            router = express_1.Router();
            new payments_controller_1.PaymentsController(router);
            app.use('/api/payments', router);
        });
    }
}
exports.MyRouter = MyRouter;
exports.router = new MyRouter();
//# sourceMappingURL=router.js.map