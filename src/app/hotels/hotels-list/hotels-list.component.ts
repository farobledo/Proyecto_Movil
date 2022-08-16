import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application, Button, Dialogs, EventData, GestureEventData, Image } from "@nativescript/core";
import { NoticiasService } from "../../domain/noticias.service";
import { RouterExtensions } from "@nativescript/angular";
import * as Toast from "nativescript-toasts";

@Component({
    selector: "Hotels",
    templateUrl: "./hotels-list.component.html" /*,
    providers: [NoticiasService]*/
})
export class HotelsComponent implements OnInit {
    resultados: Array<string>;
    constructor(public noticias: NoticiasService, private routerExtensions: RouterExtensions) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        this.noticias.buscar("").then((r: any) => {
            console.log("resultados buscarAhora: " + JSON.stringify(r));
            this.resultados = r;
        }, (e) => {
            console.log("error buscarAhora: " + e);
            Toast.show({ text: "Error en la búsqueda", duration: Toast.DURATION.SHORT });
        });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>Application.getRootView();
        sideDrawer.showDrawer();
    }

    onItemTap(x): void {
        this.routerExtensions.navigate(["./hotels/" + x.index], {
            transition: {
                name: "fade"
            }
        });
        console.dir(x);
    }

    onPull(e) {
        console.log(e);
        const pullRefresh = e.object;
        setTimeout(() => {
            this.noticias.agregar("xxxxxxx");
            pullRefresh.refreshing = false;
        }, 2000);
    }

    onLongPressImg(args: GestureEventData) {
        const grid = <Image>args.object;
        grid.rotate = 0;
        grid.animate({
            rotate: 360,
            duration: 2000
        });
    }

    doLater(fn) { setTimeout(fn, 1000); }
    masInfo(args: EventData) {
        this.doLater(() =>
            Dialogs.action("Mensaje", "Cancelar!", ["Bolivia", "Argentina"])
                .then((result) => {
                    console.log("resultado: " + result);
                    if (result === "Bolivia") {
                        this.doLater(() =>
                            Dialogs.alert({
                                title: "mas info de Bolivia ",
                                message: "esto es Bolivia",
                                okButtonText: "salir"
                            }).then(() => console.log("Cerrado Bolivia!")));
                    } else if (result === "Argentina") {
                        this.doLater(() =>
                            Dialogs.alert({
                                title: "Argentina",
                                message: "esto es Argentina",
                                okButtonText: "salir"
                            }).then(() => console.log("Cerrado Argentina!")));
                    }
                }));
    }

    reserva(args: EventData) {
        this.doLater(() =>
          Dialogs.alert({
            title: "reserva",
            message: "reserve aqui",
            okButtonText: "Cerrar"
          }).then(() => { 
            const toastOptions: Toast.ToastOptions = { text: "Reservado", duration: Toast.DURATION.SHORT };
            this.doLater(() => Toast.show(toastOptions));
              console.log("boton reserva")
            }));
      }
}
