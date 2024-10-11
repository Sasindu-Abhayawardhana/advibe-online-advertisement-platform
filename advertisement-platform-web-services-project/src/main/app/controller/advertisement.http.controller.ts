import express, {json, Request, Response} from 'express';
import {
    DeleteMapping,
    GetMapping,
    Middleware,
    PatchMapping,
    PostMapping,
    RestController
} from "../config/core.config.js";
import {FactoryService, ServiceType} from "../service/factory.service.js";
import {AdService} from "../service/custom/ad.service.js";
import cors from 'cors';

@Middleware([json(), cors()])
@RestController("/ads")
export class AdvertisementHttpController {

    @GetMapping("/")
    async getAllAdvertisements(req: Request, res: Response) {
        console.log("Get all advertisements");
        const adService =
            FactoryService.getInstance().getService(ServiceType.AD) as AdService;
        try {
            const adResult = await adService.getAllAds();
            res.json(adResult);
            console.log(adResult);
            // res.sendStatus(201);
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    }

    @PostMapping("/")
    async postAdvertisement(req: Request, res: Response) {
        console.log("Post advertisement");
        const adService =
            FactoryService.getInstance().getService(ServiceType.AD) as AdService;
        try {
            const adResultId = await adService.createNewAd(req.body);
            console.log(" advertisements 3", adResultId);
            res.json(adResultId);
            console.log("Resuklt ID", adResultId);
            // res.sendStatus(201);
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    }

    @PatchMapping("/")
    async UpdateAdvertisement(req: Request, res: Response) {
        console.log("Post advertisement");
        const adService =
            FactoryService.getInstance().getService(ServiceType.AD) as AdService;
        try {
            const adResultId = await adService.updateAd(req.body);
            console.log(" advertisements 3", adResultId);
            res.json(adResultId);
            console.log("Resuklt ID", adResultId);
            // res.sendStatus(201);
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    }

    @DeleteMapping("/:adId")
    async deleteAdvertisement(req: Request, res: Response) {
        console.log("Delete advertisement");
        const adService = FactoryService.getInstance().getService(ServiceType.AD) as AdService;
        try {
            const adId = req.params.adId;
            if (!adId) {
                res.status(400).json({message: "adId parameter is required."});
                return;
            }

            await adService.deleteAd(Number.parseInt(adId));
            console.log("Get all advertisements 3");
            res.sendStatus(201);

            // res.sendStatus(201);
        } catch (e) {
            console.log("error", e);
            res.sendStatus(500);
        }
    }
}

// Following parts are done by using the decorators
/*const router = express.Router();
const httpController = new AdvertisementHttpController();

router.get('/', httpController.getAllAdvertisements);
router.post('/', httpController.postAdvertisement);
router.delete('/:id', httpController.deleteAdvertisement);*/





