import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { GestureEventData } from "tns-core-modules/ui/gestures";
import { GridLayout } from "tns-core-modules/ui/layouts/grid-layout";
import * as Toast from "nativescript-toast";
import { Noticia } from "../models/noticia.model";
import { NoticiasService } from "../domain/noticias.service";
import { Store } from "@ngrx/store";
import { AppState } from "../app.module";
import { LeerNoticiaAction } from "../domain/noticias-state.model";

@Component({
    selector: "Featured",
    templateUrl: "./featured.component.html"
})
export class FeaturedComponent implements OnInit {
    favoritos: Array<Noticia>=[];
    hayFavoritas: boolean = false;
    constructor(private noticias: NoticiasService, private store: Store<AppState>) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        this.getFavoritos();
    }

    getFavoritos(){
        this.noticias.favs()
        .then((r: any) => {
            this.favoritos = r;
            console.dir(r);
            console.log("favoritos: " +  JSON.stringify(r));
            if (this.favoritos.length == 0) {
                this.hayFavoritas = false;
            } else if (this.favoritos.length > 0) {
                this.hayFavoritas = true;
            }            
            console.log(this.hayFavoritas);           
        }, (e) =>{
            console.log("no se pudo cargar favoritos: " + e);
        });
    }

    onRead(args: GestureEventData, n: Noticia) {
        console.log("leyendo: " + n.leyendo);
        if (n.leyendo === false) {
            n.leyendo = true;
            this.store.dispatch(new LeerNoticiaAction(n));
            
            this.store.select((state) => state.noticias.leyendo)
            .subscribe((data) => {
                if (data != null) {
                    Toast.makeText("Leyendo '" + data.titulo + "'", "short").show();
                }
            })
        } else {
            n.leyendo = false;
        }
        console.log("leyendo: " + n.leyendo);
        this.noticias.updateFavorita(n)
        .then((r: any) => {
            this.getFavoritos();
            console.dir(r);
            console.log("leyendo: " +  JSON.stringify(r));                        
        }, (e) =>{
            console.log("no se pudo cargar favoritos: " + e);
        });        
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    onLongPress(args: GestureEventData){
        console.log("Object that triggered the event: " + args.object);
        console.log("View that triggered the event: " + args.view);
        console.log("Event name: " + args.eventName);
        const grid = <GridLayout>args.object;
        grid.rotate = 0;
        grid.animate({
            rotate: 360,
            duration: 2000
        });
    }
}
