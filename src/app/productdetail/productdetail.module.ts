import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";

import { ProductdetailRoutingModule } from "./productdetail-routing.module";
import { ProductdetailComponent } from "./productdetail.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ProductdetailRoutingModule
    ],
    declarations: [
        ProductdetailComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ProducdetailModule { }