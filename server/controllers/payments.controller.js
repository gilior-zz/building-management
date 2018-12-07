"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utility_1 = require("../services/utility");
const tedious_1 = require("tedious");
class PaymentsController {
    constructor(router) {
        router.get('', this.loadAllPayments);
        router.get('/:id', this.loadPayment);
    }
    loadAllPayments(req, res) {
        utility_1.utility.loadContentAndSendToClient(req, 'ApartmentsPaymentsSelectAll', res);
    }
    loadPayment(req, res) {
        let proc_param = { type: tedious_1.TYPES.SmallInt, name: 'id', value: req.params.id };
        utility_1.utility.loadContentAndSendToClient(req, 'ApartmentsPaymentsSelectByID', res, proc_param);
    }
}
exports.PaymentsController = PaymentsController;
//# sourceMappingURL=payments.controller.js.map