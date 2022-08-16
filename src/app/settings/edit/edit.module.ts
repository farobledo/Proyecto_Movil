import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { EditRoutingModule } from "./edit-routing.module";
import { EditComponent } from "./edit.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        EditRoutingModule
    ],
    declarations: [
        EditComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class EditModule { }
