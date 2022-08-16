import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application } from "@nativescript/core";
import { NoticiasService } from "../../domain/noticias.service";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
    selector: "Hotels",
    templateUrl: "./hotels-details.component.html" /*,
    providers: [NoticiasService]*/
})
export class HotelsDetailsComponent implements OnInit {
    noticia;
    constructor(public noticias: NoticiasService, private rutaActiva: ActivatedRoute) {
        // Use the component constructor to inject providers.
        this.noticia = noticias.get(this.rutaActiva.snapshot.params.id);
    }

    ngOnInit(): void {
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>Application.getRootView();
        sideDrawer.showDrawer();
    }

    onItemTap(x): void {
        console.dir(x);
    }

    onPull(e) { 
        console.log(e); 
        const pullRefresh = e.object; 
        setTimeout(() => { 
            //this.noticias.agregar("xxxxxxx"); 
            pullRefresh.refreshing = false; 
        }, 2000); 
    }
}
