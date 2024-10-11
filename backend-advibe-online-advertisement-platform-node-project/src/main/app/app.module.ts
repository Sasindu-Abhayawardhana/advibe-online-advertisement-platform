import {Module} from "./config/core.config.js";
import {UserHttpController} from "./controller/user.http.controller.js";
import {AdvertisementHttpController} from "./controller/advertisement.http.controller.js";
import {UserLoginHttpController} from "./controller/userLogin.http.controller.js";

// Add App controllers
@Module([UserHttpController, AdvertisementHttpController,UserLoginHttpController])
export class AppModule{}