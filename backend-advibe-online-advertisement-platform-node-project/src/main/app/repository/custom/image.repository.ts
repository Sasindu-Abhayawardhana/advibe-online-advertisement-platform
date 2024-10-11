import {ImageEntity} from "../../entity/image.entity.js";
import {CrudRepository} from "../crud.repository.js";

export interface ImageRepository extends CrudRepository<ImageEntity, number> {

}