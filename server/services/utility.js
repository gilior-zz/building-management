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
const sql_service_1 = require("./sql.service");
class Utility {
    getcontent(req, proc, res, ...params) {
        return __awaiter(this, void 0, void 0, function* () {
            let con = yield sql_service_1.connect();
            let dbRes = yield sql_service_1.callProc(req, con, proc, ...params);
            con.close();
            return dbRes;
        });
    }
    sendToClient(data, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.status(200).send(data);
        });
    }
    loadContentAndSendToClient(req, proc, res, ...params) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield this.getcontent(req, proc, res, ...params);
            return this.sendToClient(data, res);
        });
    }
}
exports.utility = new Utility();
//# sourceMappingURL=utility.js.map