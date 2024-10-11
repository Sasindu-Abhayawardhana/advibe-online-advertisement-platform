import {UserTo} from "../../../to/user.to.js";
import {UserService} from "../user.service.js";
import {pool} from "../../../config/database.config.js";
import {FactoryRepository, RepositoryType} from "../../../repository/factory.repository.js";
import {UserRepository} from "../../../repository/custom/user.repository.js";
import {AdTo} from "../../../to/ad.to";
import {AdRepository} from "../../../repository/custom/ad.repository";

export class UserServiceImpl implements UserService {

    async createNewUserAccount(user: UserTo): Promise<void> {
        const connection = await pool.connect();

        // To do perform the db operation
        // first need to get the User Repository through FactoryRepository
        const userRepo = FactoryRepository.getInstance()
            .getRepository(RepositoryType.USER, connection) as UserRepository;


        // Do the business validation
        // Here simply check the user is already exist by checking the email
        if (await userRepo.existsById(user.email)) {
            throw new Error("User already exists");
        }

        // Check the contact number is already link with another user
        if ((await userRepo.findAll()).find(u => u.contact === user.contact)) {
            throw new Error("Contact number already associated with another user");
        }

        // if the business validation is okay save the user in DB
        await userRepo.save(user);

        connection.release()
    }

    async updateUserAccount( user: UserTo): Promise<void> {
        const connection = await pool.connect();

        console.log("Add ID")
        const userRepo = FactoryRepository.getInstance()
            .getRepository(RepositoryType.USER, connection) as UserRepository;


        const adResultID = await userRepo.update(user);

        connection.release();

    }

    async exitsUserAccount(email: string): Promise<boolean> {
        const connection = await pool.connect();
        const userRepo = FactoryRepository.getInstance().getRepository(RepositoryType.USER, connection) as UserRepository;

        const response = await userRepo.existsById(email);
        connection.release();
        return response;
    }

    async getUserAccountDetails(email: string): Promise<UserTo> {
        const connection = await pool.connect();

        // To do perform the db operation
        // first need to get the User Repository through FactoryRepository
        const userRepo = FactoryRepository.getInstance()
            .getRepository(RepositoryType.USER, connection) as UserRepository;


            const user = await userRepo.findById(email);
            connection.release();
            return user;
    }


    async deleteUserAccount(email : string): Promise<void> {
        const connection = await pool.connect();

        // To do perform the db operation
        // first need to get the User Repository through FactoryRepository
        const userRepo = FactoryRepository.getInstance()
            .getRepository(RepositoryType.USER, connection) as UserRepository;


        await userRepo.deleteById(email);
        connection.release();

    }
}