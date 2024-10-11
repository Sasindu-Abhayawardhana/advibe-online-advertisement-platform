import {AdEntity} from "../../entity/ad.entity.js";
import {CrudRepository} from "../crud.repository.js";

// Here create an Abstraction layer
export interface AdRepository extends CrudRepository<AdEntity, number> {
}
// By adding an Abstraction, Service layer can access the  repository layer through this interface
// That will hide the repository layer implementation