import {Request, Response, Router} from "express";
import {utility} from "../services/utility";
import {IWork, IWorkExtraDetails} from '../../shared/models'

export class WorksController {
    constructor(router: Router) {
        router.get('/', this.loadWorks);
    }

    private async loadWorks(req: Request, res: Response) {
        let func = (rows: any[]) => {
            let works: IWork[] = [];
            rows.forEach((row: IWork & IWorkExtraDetails) => {
                works.push({
                    description: row.description,
                    fromDate: row.fromDate,
                    id: row.id,
                    payment: row.payment,
                    provider: row.provider,
                    title: row.title,
                    toDate: row.toDate,
                    workExtraDetails: {id: row.id, data: row.data}
                })
            })
            return works;
        }
        utility.loadContentAndSendToClient(req, 'WorksSelectAll', res, func);
    }
}