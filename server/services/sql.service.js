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
const tedious_1 = require("tedious");
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        var config = {
            userName: 'liorg',
            password: 'nWas46*2',
            server: '188.121.44.212',
            options: {
                rowCollectionOnDone: true,
                rowCollectionOnRequestCompletion: true,
                useColumnNames: true,
                encrypt: true
            }
        };
        var connection = new tedious_1.Connection(config);
        const con = yield connectAsync(connection);
        return con;
    });
}
exports.connect = connect;
function callProc(req, con, proc, ...params) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((res, rej) => {
            var request = new tedious_1.Request(proc, function (err, rowCount, rows) {
            });
            for (let param of params)
                request.addParameter(param.name, param.type, param.value);
            request.on('doneInProc', (error, more, rows) => {
                for (let row of rows)
                    for (let key in row)
                        row[key] = typeof row[key].value == 'string' ? row[key].value.trim() : row[key].value;
                res(rows);
            });
            con.callProcedure(request);
        });
    });
}
exports.callProc = callProc;
function connectAsync(connection) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((res, rej) => {
            connection.on('connect', function (err) {
                if (err)
                    rej(err);
                res(connection);
            });
        });
    });
}
//# sourceMappingURL=sql.service.js.map