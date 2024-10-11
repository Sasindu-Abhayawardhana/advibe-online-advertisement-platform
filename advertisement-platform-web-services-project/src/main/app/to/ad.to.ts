import {UserTo} from "./user.to.js";
import {ImageTo} from "./image.to.js";

export class AdTo {

    constructor(public id: number,
                public title: string,
                public description: string,
                public postedDate: string,
                public userEmail: string) {
    }
}