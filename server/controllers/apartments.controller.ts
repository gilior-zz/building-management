import {Request, Response, Router} from "express";
import {utility} from "../services/utility";
import {Apartment, ApartmentDebt, ApartmentTenant, proc_param} from "../../shared/models";
import {TYPES} from "tedious";

export class ApartmentController {
    constructor(private router: Router) {
        router.get('/:id', this.loadApartment)
    }

    private loadApartment(req: Request, res: Response) {
        let sps: { name: string, proc_params?: proc_param }[] =
            [
                {
                    name: 'ApartmentsDebtSelectByID',
                    proc_params: {type: TYPES.SmallInt, name: 'apartment_id', value: req.params.id}
                },
                {
                    name: 'ApartmentsTenantsSelectByID',
                    proc_params: {type: TYPES.SmallInt, name: 'apartment_id', value: req.params.id}
                },
                {
                    name: 'ApartmentsSelectByID',
                    proc_params: {type: TYPES.SmallInt, name: 'apartment_id', value: req.params.id}
                }
            ]
        utility.loadMultipleContentAndSendToClient<[[ApartmentDebt, ApartmentTenant, Apartment]]>(req, res, sps)
    }
}