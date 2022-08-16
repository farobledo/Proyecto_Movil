import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { ShowComponent } from "./show/show.component";
import { EditComponent } from "./edit/edit.component";

const routes: Routes = [
    { path: "", component: ShowComponent },
    { path: "settings/:edit", component: EditComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class SettingsRoutingModule { }
