import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { RouterExtensions } from "nativescript-angular/router";
import * as app from "tns-core-modules/application";
import * as Toast from "nativescript-toast";
import * as dialogs from "tns-core-modules/ui/dialogs";
import * as appSettings from "tns-core-modules/application-settings";
import * as email from "nativescript-email";

@Component({
    selector: "Show",
    templateUrl: "./show.component.html"
})
export class ShowComponent implements OnInit {
    nombreUsuario: string = "";
    constructor(private routerExtensions: RouterExtensions) {
        // Use the component constructor to inject providers.
    }
    doLater(fn){setTimeout(fn, 1000);}
    ngOnInit(): void {
      if(appSettings.getString ("userName") == undefined){
         appSettings.setString("userName", "No hay usuario");
      }
      this.nombreUsuario = appSettings.getString ("userName");
      
      const toast = Toast.makeText("Hello World", "long");
      this.doLater(()=> toast.show());

      /*this.doLater(()=>
            dialogs.action("Mensaje", "Cancelar!", ["Opcion1", "Opcion2"])
                   .then((result)=>{
                       console.log("resultado: " + result);
                       if(result === "Opcion1"){
                           this.doLater(()=>
                               dialogs.alert({
                                   title: "Titulo 1",
                                   message: "mje 1",
                                   okButtonText: "btn 1"
                               }).then(()=> console.log("Cerrado 1!")));
                       }else if(result === "Opcion2"){
                           this.doLater(()=>
                               dialogs.alert({
                                   title: "Titulo 2",
                                   message: "mje 2",
                                   okButtonText: "btn 2"
                               }).then(()=> console.log("Cerrado 2!")));
                       }
                   }));*/
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    onItemTap(x){
        let navItemRoute = '/settings/edit';
        this.routerExtensions.navigate([navItemRoute], {
            transition: {name: "fade"}
        });

        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }

    onButtonTap(){
        console.log("email disponible");
    }
}
