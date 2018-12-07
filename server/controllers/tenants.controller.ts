import {Request, Response, Router} from "express";
import {utility} from "../services/utility";
import {proc_param} from '../../shared/models'
import {TYPES} from "tedious";

export class TenantsController {
    constructor(router: Router) {
        router.get('/', this.loadTenants);
        router.get('/:id', this.loadTenantsPerId)
    }

    async loadTenants(req: Request, res: Response) {
        utility.loadContentAndSendToClient(req, 'ApartmentsApartmentsTenantsSelectAll', res);
    }

    private loadTenantsPerId(req: Request, res: Response) {
        let proc_param: proc_param = {value: req.params.id, type: TYPES.SmallInt, name: 'id'}
        utility.loadContentAndSendToClient(req, 'ApartmentsApartmentsTenantsSelectByID', res, proc_param);
    }
}