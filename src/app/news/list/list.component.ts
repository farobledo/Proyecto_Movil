import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { RouterExtensions } from "nativescript-angular/router";
import * as app from "tns-core-modules/application";
import { Noticia } from "../../models/noticia.model";
import { NoticiasService } from "../../domain/noticias.service";
import { ListViewEventData } from "nativescript-ui-listview";

@Component({
    moduleId: module.id,
    selector: "List",
    templateUrl: "./list.component.html"
})
export class ListComponent implements OnInit {
    lasNoticias: Array<Noticia>=[];
    constructor(
        private router: Router, 
        private routerExtensions: RouterExtensions, 
        private noticias: NoticiasService) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        this.noticias.search_news()
        .then((r: any) => {
            this.lasNoticias = r;
            console.log("comienza las noticias: " +  JSON.stringify(r));                       
        }, (e) =>{
            console.log("no se pudo cargar las noticias: " + e);
        });
    }

    refreshList(args) {
        const pullRefresh = args.object;
        setTimeout(function () {
            console.log("aqui actualizamos la lista");            
            pullRefresh.refreshing = false;
        }, 1000);
    }
  
    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
    
    onItemTap(x){
        let navItemRoute = '/news/' + x.id;
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: "fade"
            }
        });

        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }
}
