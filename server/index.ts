import * as express from 'express'
import {NextFunction, Request, Response} from 'express'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import {join} from 'path'
import * as http from 'http'

const folder = './controllers';
const port = process.env.PORT || '80'
const app = express();
const client = join(__dirname, '../client/dist');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
// app.use((req: Request, res: Response, next: NextFunction) => {
//     const lang = req.query.lang;
//     req['lang'] = lang ? 'Eng' : 'Heb';
//     next();
// })
