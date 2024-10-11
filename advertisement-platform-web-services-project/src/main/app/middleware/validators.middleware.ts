import {NextFunction, Request, Response} from "express";
import {UserTo} from "../to/user.to.js";
import {validate} from "class-validator";
import {ErrorTo} from "../to/error.to.js";

export class Validators {

    static async validateUser(req: Request,
                              res: Response,
                              next: NextFunction) {
        const user = new UserTo();
        Object.assign(user, req.body);
        const errors = await validate(user);
        if (errors.length > 0) {
            console.log("Validation Error:", errors);
            res.status(400)
                .json(new ErrorTo(400,
                    "Bad Request",
                    "Data Validation Failed",
                    req.baseUrl + req.url,
                    errors));
        } else {
            next();
        }
    }
}