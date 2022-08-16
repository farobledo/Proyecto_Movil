import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { ListComponent } from "./list/list.component";
import { DetailComponent } from "./detail/detail.component";

const routes: Routes = [
    { path: "", component: ListComponent },
    { path: "news/:id", component: DetailComponent },    
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class NewsRoutingModule { }
