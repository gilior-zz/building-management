import {Request, Response, Router} from "express";
import {utility} from "../services/utility";
import {proc_param} from '../../shared/models'
import {TYPES} from "tedious";

export class LoginController {
    constructor(router: Router) {
        router.post('', this.loginUser)
    }

    private loginUser(req: Request, res: Response) {
        let params: proc_param[] = [
            {
                value: req.body.email,
                name: 'email',
                type: TYPES.NVarChar
            },
            {
                value: req.body.phone,
                name: 'phone',
                type: TYPES.NVarChar
            }, {
                value: req.body.pwd,
                name: 'pwd',
                type: TYPES.NVarChar
            }
        ]
        utility.loadContentAndSendToClient(req, 'ApartmentsTenantsSelectByEmailPhone', res,undefined, ...params)
    }
}