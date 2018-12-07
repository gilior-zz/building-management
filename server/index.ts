import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import {join} from 'path'
import {router} from "./routes/router";
import * as http from "http";
import cors = require('cors');


export class App {
    folder = './controllers';
    port = process.env.PORT || '8080'
    app = express();
    client = join(__dirname, '../client/dist');

    constructor() {
        this.setMiddlwares();
        this.setRoutes()
            .then(() => {
                this.setServer();
            })
    }

    setMiddlwares() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(cookieParser());
        this.app.use(cors())
    }

    async setRoutes() {
        await router.initRoutes(this.app)
        this.app.all('*.*', express.static(this.client));

        // catch 404 and forward to error handler
        this.app.use(function (req, res, next) {
            res.sendFile('index.html', {root: this.client});
        })
    }

    setServer() {
        const server = http.createServer(this.app);
        server.listen(this.port);
        server.on('listening', () => {
            console.log('listening on port ', this.port);
        })
        server.on('error', (err) => {
            console.log('error ', err);
        })
    }

// app.use((req: Request, res: Response, next: NextFunction) => {
//     const lang = req.query.lang;
//     req['lang'] = lang ? 'Eng' : 'Heb';
//     next();
// })
}


new App();


