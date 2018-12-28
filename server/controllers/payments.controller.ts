import {Request, Response, Router} from "express";
import {utility} from "../services/utility";
import {ApartmentDebt, ApartmentsDash, proc_param} from '../../shared/models'
import {TYPES} from "tedious";
import * as _ from 'lodash'
import {Dictionary} from 'lodash'

export class PaymentsController {
    constructor(router: Router) {
        router.get('', this.loadAllPayments)
        router.get('/:id', this.loadPayment)
    }

    private loadAllPayments(req: Request, res: Response) {
        let func = (apartmentsDash: ApartmentsDash[]): ApartmentsDash[] => {
            let result: ApartmentsDash[] = [];
            let grpd: Dictionary<ApartmentsDash[]> = _.groupBy(apartmentsDash, i => i.apartment_id);
            _.forEach(grpd, (arr: ApartmentDebt[]) => {
                let debt = _.sumBy(arr, i => i.debt);
                let floor = arr[0].floor;
                let apartment_id = arr[0].apartment_id;
                result.push({debt, floor, apartment_id})
            })
            return result
        }
        utility.loadContentAndSendToClient(req, 'ApartmentsDebtSelectAll', res, func);
    }

    private loadPayment(req: Request, res: Response) {
        let proc_param: proc_param = {type: TYPES.SmallInt, name: 'apartment_id', value: req.params.id}
        utility.loadContentAndSendToClient(req, 'ApartmentsDebtSelectByID', res, undefined, proc_param);
    }
}

