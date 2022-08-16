import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects"
import { Action } from "@ngrx/store"
import { Observable, of, from } from "rxjs";
import { map } from "rxjs/operators"
import { Noticia } from "../models/noticia.model";
import { NoticiasService } from "./noticias.service";
import { action } from "tns-core-modules/ui/dialogs/dialogs";

export interface NoticiasState{
    items: Noticia[];
    favorita: Noticia;
    leyendo: Noticia;
    leidas: Noticia[];
}

export function intializeNoticiasState(){
    return{
        items: [],
        favorita: null,
        leyendo: null,
        leidas: []
    };
}
//acciones
export enum NoticiasActionTypes{
    INIT_MY_DATA="[Noticias] Init My Data",
    NUEVA_NOTICIA="[Noticias] Nueva",
    SUGERIR_NOTICIA="[Noticias] Sugerir",
    LEER_NOTICIA = "[Noticias] Leer"
}

export class InitMyDataAction implements Action{
    type = NoticiasActionTypes.INIT_MY_DATA;
    constructor(public titulares:Noticia[]){}   
}

export class NuevaNoticiaAction implements Action{
    type = NoticiasActionTypes.NUEVA_NOTICIA;
    constructor(public noticia:Noticia){}
}

export class SugerirNoticiaAction implements Action{
    type = NoticiasActionTypes.SUGERIR_NOTICIA;
    constructor(public noticia:Noticia){}
}


export class LeerNoticiaAction implements Action {
    type = NoticiasActionTypes.LEER_NOTICIA;
    constructor (public noticia: Noticia) { }
}

export type Noticiasviajeactions= NuevaNoticiaAction | InitMyDataAction 
                                | LeerNoticiaAction | SugerirNoticiaAction;
//reducers
export function reducersNoticias(
    state:NoticiasState,
    action:Noticiasviajeactions
): NoticiasState{
    switch(action.type)
    {
        case NoticiasActionTypes.INIT_MY_DATA:{
            const titulares: Noticia[]=(action as InitMyDataAction).titulares;            
            return {
                ...state,
                items: titulares.map((n)=>new Noticia(n.id,
                        n.titulo,
                        n.categoria,
                        n.nota,
                        n.countReview))
            };
        }

        case NoticiasActionTypes.NUEVA_NOTICIA:{
            return{
                ...state,
                items:[...state.items,(action as NuevaNoticiaAction).noticia]
            };
        }

        case NoticiasActionTypes.SUGERIR_NOTICIA:{
            return{
                ...state,
                favorita:(action as SugerirNoticiaAction).noticia
            };
        }

        case NoticiasActionTypes.LEER_NOTICIA: {
            console.log("reducerNoticias - LEER_NOTICIA")
            return {
                ...state,
                leyendo: (action as LeerNoticiaAction).noticia,
                leidas: [...state.leidas, (action as LeerNoticiaAction).noticia]
            };
        }
    }
    return state;
}
//effects
@Injectable()
export class Noticiaseffects{
    @Effect()
    nuevoAgregado$:Observable<Action>=this.action$.pipe(
        ofType(NoticiasActionTypes.NUEVA_NOTICIA),
        map((action:NuevaNoticiaAction)=>new SugerirNoticiaAction(action.noticia))
    );

    constructor(private action$: Actions){}
}