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
const utility_1 = require("../services/utility");
const tedious_1 = require("tedious");
class TenantsController {
    constructor(router) {
        router.get('/', this.loadTenants);
        router.get('/:id', this.loadTenantsPerId);
    }
    loadTenants(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            utility_1.utility.loadContentAndSendToClient(req, 'ApartmentsApartmentsTenantsSelectAll', res);
        });
    }
    loadTenantsPerId(req, res) {
        let proc_param = { value: req.params.id, type: tedious_1.TYPES.SmallInt, name: 'id' };
        utility_1.utility.loadContentAndSendToClient(req, 'ApartmentsApartmentsTenantsSelectByID', res, proc_param);
    }
}
exports.TenantsController = TenantsController;
//# sourceMappingURL=tenants.controller.js.map