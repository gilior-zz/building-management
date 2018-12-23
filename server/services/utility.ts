import {Request, Response} from "express";
import {callProc, connect} from "./sql.service";
import {proc_param} from '../../shared/models'

class Utility {
    async getcontent(proc: string, ...params: proc_param[]): Promise<any> {
        let con = await connect();
        let dbRes = await callProc(con, proc, ...params);
        con.close();
        return dbRes;
    }

    async sendToClient(data, res: Response): Promise<any> {
        return res.status(200).send(data)
    }

    public async loadContentAndSendToClient(req: Request, proc: string, res: Response, func: Function, ...params: proc_param[]): Promise<any> {
        let data = await this.getcontent(proc, ...params);
        if (func)
            data = func(data);
        return this.sendToClient(data, res);
    }

    public async loadMultipleContentAndSendToClient<T>(req: Request, res: Response, sps: { name: string; proc_params?: proc_param }[]) {
        let finalData: T[] = [];
        for (let sp of sps) {
            let data = await this.getcontent(sp.name, sp.proc_params)
            finalData.push(data);
        }
        this.sendToClient(finalData,res);
    }
}

export const utility = new Utility();