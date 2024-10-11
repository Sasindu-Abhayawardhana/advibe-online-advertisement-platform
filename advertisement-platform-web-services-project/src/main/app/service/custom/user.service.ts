import {UserTo} from "../../to/user.to.js";

export interface UserService {

    createNewUserAccount(user: UserTo): Promise<void>;

    updateUserAccount( user: UserTo): Promise<void>;

    exitsUserAccount(email: string): Promise<boolean>;

    getUserAccountDetails(email: string): Promise<UserTo>;

    deleteUserAccount(email: string): Promise<void>;
}