import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";

import { HotelsComponent } from "./hotels-list/hotels-list.component";
import { HotelsDetailsComponent } from "./hotels-details/hotels-details.component";

const routes: Routes = [
    { path: "", component: HotelsComponent },
    { path: ":id", component: HotelsDetailsComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class HotelsRoutingModule { }
