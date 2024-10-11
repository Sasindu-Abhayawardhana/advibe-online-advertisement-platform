import {UserServiceImpl} from "./custom/impl/user.service.impl.js";
import {AdServiceImpl} from "./custom/impl/ad.service.impl.js";

export enum ServiceType {
    USER, AD
}

// This is same as repository factory
export class FactoryService {

    // Return the same Factory Instance with all
    private static readonly INSTANCE = new FactoryService();

    private constructor() {
    }

    // First need to get the instance of the factory
    static getInstance(): FactoryService {
        return FactoryService.INSTANCE;
    }

    // the need to get the repository by passing repository and client connection
    getService(type: ServiceType){
        switch (type){
            case ServiceType.USER: return new UserServiceImpl();
            case ServiceType.AD: return new AdServiceImpl();
        }
    }
}