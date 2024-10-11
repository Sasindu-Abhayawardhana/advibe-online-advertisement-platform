import {json, Request, Response} from 'express';
import {Validators} from "../middleware/validators.middleware.js";
import {
    DeleteMapping,
    GetMapping,
    Middleware,
    PatchMapping,
    PostMapping,
    RestController
} from "../config/core.config.js";
import {FactoryService, ServiceType} from "../service/factory.service.js";
import {UserService} from "../service/custom/user.service.js";
import cors from 'cors';
import {UserTo} from "../to/user.to";
import {AdService} from "../service/custom/ad.service";

@Middleware([json(),cors()])
@RestController("/users")
export class UserHttpController {

    @Middleware([json(), Validators.validateUser])
    @PostMapping()
    async createNewUserAccount(req: Request, res: Response) {
        console.log("Create User",req.body);
        const userService =
            FactoryService.getInstance().getService(ServiceType.USER) as UserService;
        try {
            console.log(req.body);
            await userService.createNewUserAccount(req.body);
            res.sendStatus(201);
        }catch(e){
            console.log(e);
            res.sendStatus(500);
        }
    }

    @Middleware([json(), Validators.validateUser])
    @PatchMapping("/")
    async updateUserAccount(req: Request, res: Response) {
        console.log("Update user",req.body);
        const userService =
            FactoryService.getInstance().getService(ServiceType.USER) as UserService;
        try {

            const userResultId = await userService.updateUserAccount(req.body);
            res.json(userResultId);
            console.log("Result ID",userResultId);
        }catch(e){
            console.log(e);
            res.sendStatus(500);
        }
    }

    @DeleteMapping("/:user")
    async deleteUserAccount(req: Request, res: Response) {
        console.log("Delete user account");
        const userService = FactoryService.getInstance().getService(ServiceType.USER) as UserService;
        try {
            const email = req.params.user;
            if (!email) {
                res.status(400).json({ message: "Email parameter is required." });
                return;
            }

            if(await userService.exitsUserAccount(email)){
                await userService.deleteUserAccount(email);
                res.sendStatus(201);
            }
            else{
                return res.status(404).json({ message: 'User not found. Please create a new account.' });
            }

            // res.sendStatus(201);
        }catch(e){
            console.log("error",e);
            res.sendStatus(500);
        }
    }

    @GetMapping("/:user")
    async getUserAccount(req: Request, res: Response) {
        console.log("Get user account information");
        const userService =
            FactoryService.getInstance().getService(ServiceType.USER) as UserService;
        try {
            const email = req.params.user;
            if (!email) {
                res.status(400).json({ message: "Email parameter is required." });
                return;
            }

            if(await userService.exitsUserAccount(email)){
                const requiredUser = await userService.getUserAccountDetails(email);
                console.log("Get all advertisements 3");
                res.json(requiredUser);
                console.log(requiredUser);
            }
            else{
                return res.status(404).json({ message: 'User not found. Please create a new account.' });
            }

            // res.sendStatus(201);
        }catch(e){
            console.log("error",e);
            res.sendStatus(500);
        }
    }
}