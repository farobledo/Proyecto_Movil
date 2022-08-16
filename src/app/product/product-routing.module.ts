import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";


import { ProductComponent } from "./product.component";

const routes: Routes = [
    { path: "", component: ProductComponent },
    { path: "productdetail", loadChildren: () => import("~/app/productdetail/productdetail.module").then((m) => m.ProducdetailModule) }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ProductRoutingModule { }