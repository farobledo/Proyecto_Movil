import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import * as dialogs from "tns-core-modules/ui/dialogs";
import * as Toast from "nativescript-toast";
import { Color, View } from "tns-core-modules/ui/core/view/view";
import { Store } from "@ngrx/store";
import { AppState } from "../app.module";
import { NoticiasService } from "../domain/noticias.service";
import { Noticia } from "../models/noticia.model";
import { NuevaNoticiaAction } from "../domain/noticias-state.model";
import * as SocialShare from "nativescript-social-share";

@Component({
    selector: "Search",
    moduleId: module.id,
    templateUrl: "./search.component.html"
})
export class SearchComponent implements OnInit {
    noticia: Noticia;
    resultados: Array<Noticia>;
    @ViewChild("layout", { static: false }) layout:ElementRef;

    constructor(private noticias: NoticiasService, private store: Store<AppState>) {       
    }

    doLater(fn){setTimeout(fn, 1000);}

    ngOnInit(): void {
        this.store.select((state) => state.noticias.favorita)
        .subscribe((data) => {
            const f = data;
            if (f != null) {                
                const toast = Toast.makeText("recomendamos leer: " + f.titulo, "long");
                    toast.show();                
            }
        });
    }
    
    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    onItemTap(args){
        console.dir(args);
        console.dir(args.view.bindingContext);
        this.noticia = this.resultados[args.index];
        this.noticia.favorita = true;
        console.log(this.noticia);
        this.noticias.agregar(this.noticia)
            .then((r: any) => {
                console.log("favorito agregado: " +  JSON.stringify(r));
                const toast = Toast.makeText("favorito agregado: " + this.noticia.titulo, "long");
                toast.show();
            }, (e) =>{
                console.log("error al agregar favorito: " + e);
                const toast = Toast.makeText("error al agregar favorito", "long");
                toast.show();            
            });
        /* esto era cuando se usaba planetas y se agregaba un color
        this.doLater(()=>
            dialogs.action("Elegir Color", "Cancelar!", ["Rojo", "Azul", "Verde"])
               .then((result)=>{
                    if(result != "Cancelar!"){                        
                        console.log("color elegido: " + result); 
                    }                                      
               })
        );  */
        this.store.dispatch(new NuevaNoticiaAction(new Noticia(args.view.bindingContext)));
    }

    onLongPress(x: Noticia){
        SocialShare.shareText(x.titulo);
    }

    buscarAhora(s: string){
        console.dir("buscarAhora" + s);
        this.noticias.buscar(s).then((r: any) => {
            console.log("resultados buscarAhora" + JSON.stringify(r));            
            this.resultados = r;
        }, (e) =>{
            console.log("error buscarAhora" + e);
            const toast = Toast.makeText("Error en la busqueda", "long");
            toast.show();            
        });
        
        const layout = <View>this.layout.nativeElement;
        layout.animate({
            backgroundColor: new Color("blue"),
            duration: 300,
            delay: 150
        }).then(()=> layout.animate({
            backgroundColor: new Color("white"),
            duration: 300,
            delay: 150
        }));
    }
}
