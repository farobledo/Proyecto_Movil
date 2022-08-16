import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { SearchRoutingModule } from "./search-routing.module";
import { MinLenDirective } from "./minlen.validator"; 
import { SearchFormComponent } from "./search-form.component";
import { SearchComponent } from "./search.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        SearchRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        MinLenDirective,
        SearchFormComponent,
        SearchComponent
    ],    
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SearchModule { }
