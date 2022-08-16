import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";

import { NewsRoutingModule } from "./news-routing.module";
import { ListComponent } from "./list/list.component";
import { DetailComponent } from "./detail/detail.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NewsRoutingModule,
        NativeScriptUIListViewModule
    ],
    declarations: [
        ListComponent, 
        DetailComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class NewsModule { }
