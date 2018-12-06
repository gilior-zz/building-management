import {Request, Response} from "express";
import {callProc, connect} from "./sql.service";
import {proc_param} from '../../shared/models'

class Utility {
    async getcontent(req: Request, proc: string, res: Response, ...params: proc_param[]): Promise<any> {
        let con = await connect();
        let dbRes = await callProc(req, con, proc, ...params);
        con.close();
        return dbRes;
    }

    async sendToClient(data, res: Response): Promise<any> {
        return res.status(200).send(data)
    }

    public async loadContentAndSendToClient(req: Request, proc: string, res: Response, ...params: proc_param[]): Promise<any> {
        let data = await this.getcontent(req, proc, res, ...params);
        return this.sendToClient(data, res);
    }
}

export const utility = new Utility();