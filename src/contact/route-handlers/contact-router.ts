
import {RouterConfiguration , Router} from 'aurelia-router';


export class Main{

    private router:Router;

    configureRouter(config : RouterConfiguration , router : Router){

        this.router = router;

        config.map( [
            {route:'' , title:'New Contact' , moduleId : '../new-contact' , nav : true}
        ] );
    }
}