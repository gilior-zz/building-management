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
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path_1 = require("path");
const router_1 = require("./routes/router");
const http = require("http");
class App {
    constructor() {
        this.folder = './controllers';
        this.port = process.env.PORT || '8080';
        this.app = express();
        this.client = path_1.join(__dirname, '../client/dist');
        this.setMiddlwares();
        this.setRoutes()
            .then(() => {
            this.setServer();
        });
    }
    setMiddlwares() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cookieParser());
    }
    setRoutes() {
        return __awaiter(this, void 0, void 0, function* () {
            yield router_1.router.initRoutes(this.app);
            this.app.all('*.*', express.static(this.client));
            this.app.use(function (req, res, next) {
                res.sendFile('index.html', { root: this.client });
            });
        });
    }
    setServer() {
        const server = http.createServer(this.app);
        server.listen(this.port);
        server.on('listening', () => {
            console.log('listening on port ', this.port);
        });
        server.on('error', (err) => {
            console.log('error ', err);
        });
    }
}
exports.App = App;
new App();
//# sourceMappingURL=index.js.map