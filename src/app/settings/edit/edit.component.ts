import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { RouterExtensions } from "nativescript-angular/router";
import { TextField } from "tns-core-modules/ui/text-field";
import * as app from "tns-core-modules/application";
import * as appSettings from "tns-core-modules/application-settings";

@Component({
    selector: "edit",
    templateUrl: "./edit.component.html"
})
export class EditComponent implements OnInit {
    tfnombre: string = "";
    constructor(private routerExtensions: RouterExtensions) {
    }

    ngOnInit(): void {        
    }
  
    onButtonTap(e): void {      
        console.log("nombre recogido: " + this.tfnombre);
        if (this.tfnombre.length > 2) {
            appSettings.setString ("userName", this.tfnombre);
            console.log("userName: " + appSettings.getString("userName"));
        }

        this.routerExtensions.navigate(['/settings'], {
            transition: {name: "fade"}
        });

        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
