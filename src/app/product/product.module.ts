import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";

import { ProductRoutingModule } from "./product-routing.module";
import { ProductComponent } from "./product.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ProductRoutingModule
    ],
    declarations: [
        ProductComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ProductModule { }