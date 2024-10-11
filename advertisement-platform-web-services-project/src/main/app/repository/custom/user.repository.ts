import {CrudRepository} from "../crud.repository.js";
import {UserEntity} from "../../entity/user.entity.js";

export interface UserRepository extends CrudRepository<UserEntity, string>{

}