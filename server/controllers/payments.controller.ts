import {Request, Response, Router} from "express";
import {utility} from "../services/utility";
import {proc_param} from '../../shared/models'
import {TYPES} from "tedious";


export class PaymentsController {
    constructor(router: Router) {
        router.get('', this.loadAllPayments)
        router.get('/:id', this.loadPayment)
    }

    private loadAllPayments(req: Request, res: Response) {
        utility.loadContentAndSendToClient(req, 'ApartmentsPaymentsSelectAll', res);
    }

    private loadPayment(req: Request, res: Response) {
        let proc_param: proc_param = {type: TYPES.SmallInt, name: 'id', value: req.params.id}
        utility.loadContentAndSendToClient(req, 'ApartmentsPaymentsSelectByID', res, proc_param);
    }
}

