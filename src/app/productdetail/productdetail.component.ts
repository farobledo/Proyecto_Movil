import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application } from "@nativescript/core";
import { NoticiasService } from "../domain/noticias.service";

@Component({
    selector: "Productdetail",
    moduleId: module.id,
    templateUrl: "./productdetail.component.html",
    //providers: [NoticiasService]
})
export class ProductdetailComponent implements OnInit {

    constructor(public noticias: NoticiasService) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        this.noticias.agregar("Artículo 1");
        this.noticias.agregar("Artículo 2");
        this.noticias.agregar("Artículo 3");
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>Application.getRootView();
        sideDrawer.showDrawer();
    }

    onItemTap(x): void {
        console.dir(x)
    }
}