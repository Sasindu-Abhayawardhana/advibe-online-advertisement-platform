
import {ExpressApp} from "./main/app/config/core.config.js";
import {AppModule} from "./main/app/app.module.js";

// Add layered architecture to the project
/*
* Revamp the folder structure according to the layered architecture
* Add controllers into controller layer
* Add middlewares into separate layer
* add repository layer (DAO)
* add service layer (Business)
* */


function bootstrap(){
    const app = ExpressApp.create(AppModule);
    app.listen(5050, ()=>{
        console.log("Server is listening at 5050");
    });
}

bootstrap();