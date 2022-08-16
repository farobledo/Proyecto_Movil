import { Injectable } from "@angular/core";
import { getJSON, request } from "tns-core-modules/http";
const sqlite = require("nativescript-sqlite");
import { Couchbase } from "nativescript-couchbase";
import { Noticia } from "../models/noticia.model";

@Injectable()
export class NoticiasService {
    api: string = "http://240a8faf46cb.ngrok.io";
    private database:any;

    public noticiaElegida: Noticia | null;
    public noticiaCounter: number;

    constructor(){        
        this.getDB((db)=>{
                console.dir(db);
                db.each("select * from logs",
                (err,fila)=> console.log("fila: ", fila),
                (err, totales)=>console.log("Filas Totales: ", totales));
            },()=>console.log("error on getDB"));

        this.database = new Couchbase("test-database");
        this.database.createView("logs", "1", (document, emitter) =>
            emitter.emit(document._id, document));
        const rows  = this.database.executeQuery("logs", {limit : 200});
        console.log("documentos: " + JSON.stringify(rows ));
    }

    getDB(fnOK,fnError){
        return new sqlite("mi_db_logs",(err,db)=>{
            if(err){
                console.error("Error al abrir db",err);
            }else{
                console.log("Está la db abierta:",db.isOpen()?"Si":"No");
                db.execSQL("CREATE TABLE IF NOT EXISTS logs (id INTEGER PRIMARY KEY AUTOINCREMENT, texto TEXT)")
                .then((id)=>{
                    console.log("CREATE TABLE OK");
                    fnOK(db);
                },(error)=>{
                    console.log("CREATE TABLE ERROR", error);
                    fnError(error);
                });
            }
        });
            
    }
    
    agregar(n: Noticia){
        return request({
            url: this.api + "/favs",
            method: "POST",
            headers: { "Content-Type": "application/json"},
            content: JSON.stringify({ nuevo: n })
        });
    }

    favs(){
        return getJSON(this.api + "/favs");
    }

    buscar(s: string){
        /*this.getDB((db)=>{
           db.execSQL("INSERT INTO logs (texto) VALUES(?)",[s],
           (err,id)=> console.log("nuevo id:",id));
        },()=>console.log("Error on getDB"));

        const documentId = this.database.createDocument({ texto: s });
        console.log("nuevo id couchbase: ", documentId);*/ 
 
        return getJSON(this.api + "/news?q=" + s);
    }

    search_news(s: string = ""){
        return getJSON(this.api + "/news?q=" + s);
    }

    updateFavorita(n: Noticia) {
        return request({
            url: this.api + "/favs",
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({
                update: n
            })
        })
    }
}