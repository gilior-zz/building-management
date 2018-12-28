import {Request, Response, Router} from "express";
import {utility} from "../services/utility";

export class MetadataController {
    constructor(router: Router) {
        router.get('', this.loadMetaData)
    }

    private loadMetaData(req: Request, res: Response) {
        utility.loadContentAndSendToClient(req, 'MetaDataSelect', res, undefined);
    }
}