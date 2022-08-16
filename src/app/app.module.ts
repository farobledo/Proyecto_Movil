import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { ActionReducerMap, StoreModule as NgRxStoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeService } from "./domain/home.service";
import { NoticiasService } from "./domain/noticias.service";
import { 
    intializeNoticiasState,
    Noticiaseffects,
    NoticiasState,
    reducersNoticias } from "./domain/noticias-state.model";

import { NewsModule } from "./news/news.module";
import { SettingsModule } from "./settings/settings.module";

//redux init
export interface AppState{
    noticias: NoticiasState;
}

const reducers:ActionReducerMap<AppState>={
    noticias:reducersNoticias
};

const reducersInistate = {
    noticias:intializeNoticiasState()
};

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        NativeScriptModule,
        NativeScriptUISideDrawerModule,
        NewsModule,
        SettingsModule,
        NgRxStoreModule.forRoot(reducers,{initialState:reducersInistate}),
        EffectsModule.forRoot([Noticiaseffects])
    ],
    providers: [HomeService, NoticiasService],
    declarations: [
        AppComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
