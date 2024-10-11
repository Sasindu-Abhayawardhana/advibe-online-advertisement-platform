import express, {RequestHandler} from "express";

// Define types

type Handler = {
    name?: string,
    path?: string,
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    middlewares?: Array<RequestHandler>
}

type Handlers = {
    [handler: string]: Handler
}

type Controller = {
    path?: string,
    middlewares?: Array<RequestHandler>,
    handlers?: Handlers,
    constructor: Function
}

type Controllers = {
    [controller: string]: Controller
}
// Use object to store all the data which are collected using the decorators
const CONTROLLERS: Controllers = {};

// Here define all the decorators which use to route the reqs
export function Module(controllers: Array<Function>) {
    return function (constructor: Function) {
    }
}

// register the path for each controller
export function RestController(path: string = "/") {
    return function (constructor: Function) {
        CONTROLLERS[constructor.name].path = path;
        CONTROLLERS[constructor.name].constructor = constructor;
    }
}

// middleware decorator
export function Middleware(middlewares: Array<RequestHandler>) {
    return function (target: Object | Function, name?: string, descriptor?: PropertyDescriptor) {

 /*
* For class decorators : target is the class constructor function.
* For method or property decorators : target is the prototype object of the method or property is defined.
* name : This parameter holds the name of the property or method being decorated.
* descriptor : object that provides detailed information about the property or method being decorated.
* */

        // if the name and descriptor is undefined that means its class decorator
        if (!name && !descriptor) {
            // Class
            // if the controller isn't already added to the controller object then add it
            if (!CONTROLLERS[(target as Function).name]) CONTROLLERS[(target as Function).name] = {};
            // then set the middleware which pass with the decorator
            CONTROLLERS[(target as Function).name].middlewares = middlewares;
        } else {
            // Method
            // if a method is adding as a middleware
            // target.constructor.name = prototype object.constructor.name
            // first check the availability of the controller
            // second check the availability of the handler object of the controller
            // third check the availability of the decorated handler ( like createNewUserAccount)

            if (!CONTROLLERS[target.constructor.name]) CONTROLLERS[target.constructor.name] = {};
            if (!CONTROLLERS[target.constructor.name].handlers) CONTROLLERS[target.constructor.name].handlers = {};
            if (!CONTROLLERS[target.constructor.name].handlers![name!]) CONTROLLERS[target.constructor.name].handlers![name!] = {
                name
            };

            // Finally add the middleware to handler object
            CONTROLLERS[target.constructor.name].handlers![name!].middlewares = middlewares;
        }
    }
}

// Req mapping decorator
export function GetMapping(path: string = "/"){
    return function(prototype: Object, name: string, descriptor: PropertyDescriptor){
        if (!CONTROLLERS[prototype.constructor.name]) CONTROLLERS[prototype.constructor.name] = {};
        if (!CONTROLLERS[prototype.constructor.name].handlers) CONTROLLERS[prototype.constructor.name].handlers = {};
        CONTROLLERS[prototype.constructor.name].handlers![name] = {
            name,
            path,
            method: 'GET'
        }
    }
}

export function PostMapping(path: string = "/"){
    return function(prototype: Object, name: string, descriptor: PropertyDescriptor){

        // check the availability of the handler object of the controller
        // then add the path and HTTP command
        if (!CONTROLLERS[prototype.constructor.name]) CONTROLLERS[prototype.constructor.name] = {};
        if (!CONTROLLERS[prototype.constructor.name].handlers) CONTROLLERS[prototype.constructor.name].handlers = {};
        CONTROLLERS[prototype.constructor.name].handlers![name] = {
            name,
            path,
            method: 'POST'
        }
    }
}

export function PutMapping(path: string = "/"){
    return function(prototype: Object, name: string, descriptor: PropertyDescriptor){
        if (!CONTROLLERS[prototype.constructor.name]) CONTROLLERS[prototype.constructor.name] = {};
        if (!CONTROLLERS[prototype.constructor.name].handlers) CONTROLLERS[prototype.constructor.name].handlers = {};
        CONTROLLERS[prototype.constructor.name].handlers![name] = {
            name,
            path,
            method: 'PUT'
        }
    }
}

export function DeleteMapping(path: string = "/"){
    return function(prototype: Object, name: string, descriptor: PropertyDescriptor){
        if (!CONTROLLERS[prototype.constructor.name]) CONTROLLERS[prototype.constructor.name] = {};
        if (!CONTROLLERS[prototype.constructor.name].handlers) CONTROLLERS[prototype.constructor.name].handlers = {};
        CONTROLLERS[prototype.constructor.name].handlers![name] = {
            name,
            path,
            method: 'DELETE'
        }
    }
}

export function PatchMapping(path: string = "/"){
    return function(prototype: Object, name: string, descriptor: PropertyDescriptor){
        if (!CONTROLLERS[prototype.constructor.name]) CONTROLLERS[prototype.constructor.name] = {};
        if (!CONTROLLERS[prototype.constructor.name].handlers) CONTROLLERS[prototype.constructor.name].handlers = {};
        CONTROLLERS[prototype.constructor.name].handlers![name] = {
            name,
            path,
            method: 'PATCH'
        }
    }
}

// Now create a express app using the collected details through decorators
// use CONTROLLER object to inject the details
export class ExpressApp {
    // This create function call from the main.ts
    static create(module: Function) {
        // Create the main express app
        const app = express();

        console.log(CONTROLLERS);
        console.log('===================')
        console.log(CONTROLLERS['UserHttpController']);
        console.log('===================')
        console.log(CONTROLLERS['AdvertisementHttpController']);

        // Iterate through the CONTROLLER to get the controller

        for (const controllerObj of Object.values(CONTROLLERS)) {
            // construtor nthn wadk wenne na, next ekata ynawa
            // knk copntroller hadala, reset controller eka dala na
            // @RestController("/users") tynna one
            // ehma unoth eya controller knk kyla salakan na

            // Here need to have a controller constructor
            // need to set the path through @RestController("/users") decorator
            // if the route path is not set then skip those controllers
            if (!controllerObj.constructor) continue;

            // create a separate route for each controller
            const router = express.Router();

            // Tell explicitly to treat as constructor function to use new keyword and create new instance
            const controller = new (controllerObj.constructor as (new () => any))();

            //iterate through middleware
            for (const middleware of controllerObj.middlewares!) {
                router.use(middleware);
            }

            // Set the handlers
            /*
            router.get("/me", httpController.getUserAccount);
            router.post("/", Validators.validateUser, httpController.createNewUserAccount);
            router.delete("/me", httpController.deleteUserAccount);
            * */
            for (const handler of Object.values(controllerObj.handlers!)) {
                // Iterate handlers
                switch (handler.method) {
                    // according to the http command map the handler
                    case "GET":
                        if (handler.middlewares) {
                            // path, middlewares, handler
                            router.get(handler.path!, [...handler.middlewares, controller[handler.name!]]);
                        } else {
                            router.get(handler.path!, controller[handler.name!]);
                        }
                        break;
                    case "POST":
                        if (handler.middlewares) {
                            router.post(handler.path!, [...handler.middlewares, controller[handler.name!]]);
                        } else {
                            router.post(handler.path!, controller[handler.name!]);
                        }
                        break;
                    case "PUT":
                        if (handler.middlewares) {
                            router.put(handler.path!, [...handler.middlewares, controller[handler.name!]]);
                        } else {
                            router.put(handler.path!, controller[handler.name!]);
                        }
                        break;
                    case "DELETE":
                        if (handler.middlewares) {
                            router.delete(handler.path!, [...handler.middlewares, controller[handler.name!]]);
                        } else {
                            router.delete(handler.path!, controller[handler.name!]);
                        }
                        break;
                    case "PATCH":
                        if (handler.middlewares) {
                            router.patch(handler.path!, [...handler.middlewares, controller[handler.name!]]);
                        } else {
                            router.patch(handler.path!, controller[handler.name!]);
                        }
                        break;
                }
            }
            // Pass the main app path and router object
            app.use(controllerObj.path!, router);
        }
        return app;
    }
}

