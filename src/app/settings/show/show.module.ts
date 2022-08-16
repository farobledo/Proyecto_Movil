import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { ShowRoutingModule } from "./show-routing.module";
import { ShowComponent } from "./show.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ShowRoutingModule
    ],
    declarations: [
        ShowComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ShowModule { }
