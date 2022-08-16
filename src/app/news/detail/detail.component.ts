import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { Noticia } from "../../models/noticia.model";
import { NoticiasService } from "../../domain/noticias.service";
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: "detail",
    templateUrl: "./detail.component.html"
})
export class DetailComponent implements OnInit {
    lanoticia: Array<Noticia>;
    constructor(private route: ActivatedRoute, private noticias: NoticiasService) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.noticias.search_news()
        .then((r: any) => {
            this.lanoticia = r[id];
            console.log("detalle de la noticia: " +  JSON.stringify(this.lanoticia));                       
        }, (e) =>{
            console.log("no se pudo cargar el detalle de la noticia: " + e);
        });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
