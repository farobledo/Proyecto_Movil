import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application, Dialogs } from "@nativescript/core";
import * as dialogs from "tns-core-modules/ui/dialogs";
import * as Toast from "nativescript-toasts";
import * as appSettings from "tns-core-modules/application-settings"; 
import { PromptOptions, PromptResult } from "@nativescript/core/ui/dialogs/dialogs-common";

@Component({
    selector: "Settings",
    templateUrl: "./settings.component.html"
})
export class SettingsComponent implements OnInit {
    nombreUsuario: string;

    constructor() {
        this.nombreUsuario = "Nombre Usuario";
    }

    doLater(fn) { setTimeout(fn, 1000); }

    ngOnInit(): void {
        /*this.doLater(() => 
            Dialogs.action("Mensaje", "Cancelar!", ["Opcion1", "Opcion2"])
                .then((result) => {
                    console.log("resultado: " + result);
                    if(result === "Opcion1") {
                        this.doLater(() => 
                        Dialogs.alert({
                            title: "Título 1",
                            message: "mj 1",
                            okButtonText: "btn 1"
                        }).then(() => console.log("Cerrado 1!")));
                    } else if(result === "Opcion2") {
                        this.doLater(() => 
                        Dialogs.alert({
                            title: "Título 2",
                            message: "mj 2",
                            okButtonText: "btn 2"
                        }).then(() => console.log("Cerrado 2!")));
                    }
                })
        );*/
        const toastOptions: Toast.ToastOptions = { text: "Hello World", duration: Toast.DURATION.SHORT };
        this.doLater(() => Toast.show(toastOptions));
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>Application.getRootView();
        sideDrawer.showDrawer();
    }

    onButtonUsuario() {
        let options: PromptOptions = {
            title: "Nombre de usuario",
            inputType: dialogs.inputType.text,
            defaultText: "Usuario",
            okButtonText: "Guardar",
            cancelButtonText: "Cancelar",
            cancelable: true
        }

        dialogs.prompt(options).then((result: PromptResult) => {
            if (result.result === true) {
                if(result.text.length > 0) {
                    appSettings.setString("userName", result.text);
                    console.log("userName: " + appSettings.getString("userName"));
                    this.nombreUsuario = appSettings.getString("userName");
                }
            }
        })
    }
}
