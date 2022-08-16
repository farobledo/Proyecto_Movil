import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";
import { NoticiasService } from "../domain/noticias.service";

import { HotelsRoutingModule } from "./hotels-routing.module";
import { HotelsComponent } from "./hotels-list/hotels-list.component";
import { HotelsDetailsComponent } from "./hotels-details/hotels-details.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        HotelsRoutingModule
    ],
    declarations: [
        HotelsComponent,
        HotelsDetailsComponent
    ],
    // providers: [NoticiasService],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HotelsModule { }
