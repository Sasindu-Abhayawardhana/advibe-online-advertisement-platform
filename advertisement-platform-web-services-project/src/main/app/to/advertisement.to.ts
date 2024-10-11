import {UserTo} from "./user.to";
import {ImageTo} from "./image.to";

export class AdvertisementTo {

    constructor(public id: number,
                public title: string,
                public description: string,
                public postedDate: string,
                public user: UserTo,
                public images: Array<ImageTo>) {
    }
}