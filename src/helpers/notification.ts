

import * as alertify from 'alertify';
import * as toastr from 'toastr';

export class Notification {


    confirm(message: string) {
        return new Promise(resolve => {
            alertify.confirm(message,
                function () { resolve(true); }, function () { resolve(false); });
        });
    }

    success(message){
        return new Promise(resolve=>{
            toastr.clear();
            toastr.success(message);
        });
    }

}