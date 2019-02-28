import {Request, Response, Router} from "express";
import {utility} from "../services/utility";
import {proc_param} from '../../shared/models'
import {TYPES} from "tedious";

export class TenantsController {
    constructor(router: Router) {
        router.get('/', this.loadTenants);
        router.get('/:id', this.loadTenantsPerId);
        router.put('/:id', this.updateTenant)
        router.post('/:id', this.addTenant)
    }

    async loadTenants(req: Request, res: Response) {
        utility.loadContentAndSendToClient(req, 'ApartmentsApartmentsTenantsSelectAll', res, undefined);
    }

    private loadTenantsPerId(req: Request, res: Response) {
        let proc_param: proc_param = {value: req.params.id, type: TYPES.SmallInt, name: 'id'}
        utility.loadContentAndSendToClient(req, 'ApartmentsApartmentsTenantsSelectByID', res, undefined, proc_param);
    }

    private updateTenant(req: Request, res: Response) {
        let proc_params: proc_param[] = [
            {value: req.params.id, type: TYPES.SmallInt, name: 'id'},
            {value: req.body.columnName, type: TYPES.NVarChar, name: 'columnName'},
            {value: req.body.newVlaue, type: TYPES.NVarChar, name: 'newVlaue'}
        ]
        utility.loadContentAndSendToClient(req, 'ApartmentsTenantsUpdateById', res, undefined, ...proc_params);
    }

    private addTenant(req: Request, res: Response) {
        let proc_params: proc_param[] = [
            {value: req.params.id, type: TYPES.SmallInt, name: 'apartment_id'},
            {value: req.body.columnName, type: TYPES.NVarChar, name: 'columnName'},
            {value: req.body.newVlaue, type: TYPES.NVarChar, name: 'newVlaue'}
        ]
        utility.loadContentAndSendToClient(req, 'ApartmentsTenantsAddNew', res, undefined, ...proc_params);

    }
}