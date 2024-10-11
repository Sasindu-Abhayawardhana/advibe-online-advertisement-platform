import { AdTo } from "../../../to/ad.to.js";
import {AdService} from "../ad.service.js";
import {pool} from "../../../config/database.config.js";
import {FactoryRepository, RepositoryType} from "../../../repository/factory.repository.js";
import {UserRepository} from "../../../repository/custom/user.repository.js";
import {AdRepository} from "../../../repository/custom/ad.repository.js";
import {AdEntity} from "../../../entity/ad.entity.js";

export class AdServiceImpl implements AdService {

    async getAllAds(): Promise<AdTo[]> {
        const connection = await pool.connect();

        console.log("GetALLADS")
        const adRepo = FactoryRepository.getInstance()
            .getRepository(RepositoryType.AD, connection) as AdRepository;


        const adResult :Array<AdEntity> = await adRepo.findAll();

        connection.release()

        return adResult;
    }
    getAdsByUser(email: string): Promise<AdTo[]> {
        throw new Error("Method not implemented.");
    }
    getAdById(adId: number): Promise<AdTo> {
        throw new Error("Method not implemented.");
    }
    async createNewAd( ad: AdTo): Promise<number> {
        const connection = await pool.connect();

        console.log("Add ID")
        const adRepo = FactoryRepository.getInstance()
            .getRepository(RepositoryType.AD, connection) as AdRepository;


        const adResultID = await adRepo.save(ad);

        connection.release()

        return adResultID;
    }

    async updateAd( ad: AdTo): Promise<void> {
        const connection = await pool.connect();

        console.log("Add ID")
        const adRepo = FactoryRepository.getInstance()
            .getRepository(RepositoryType.AD, connection) as AdRepository;


        const adResultID = await adRepo.update(ad);

        connection.release();

    }

    async deleteAd( adId: number): Promise<void> {
        const connection = await pool.connect();

        // To do perform the db operation
        // first need to get the User Repository through FactoryRepository
        const adRepo = FactoryRepository.getInstance()
            .getRepository(RepositoryType.AD, connection) as AdRepository;

        console.log("Service",adId);

        await adRepo.deleteById(adId);
        connection.release();
    }

}