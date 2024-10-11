import {AdTo} from "../../to/ad.to.js";

export interface AdService {

    getAllAds(): Promise<Array<AdTo>>;

    getAdsByUser(email: string): Promise<Array<AdTo>>;

    getAdById(adId: number): Promise<AdTo>;

    createNewAd(ad: AdTo): Promise<number>;

    deleteAd(adId: number): Promise<void>;

    updateAd(ad: AdTo): Promise<void>;
}