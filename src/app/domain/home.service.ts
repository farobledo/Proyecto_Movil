import { Injectable } from "@angular/core";

@Injectable()
export class HomeService {
    private home:Array<string> = [];
    agregar(s: string){
        this.home.push(s);
    }
    mostrar(){
        return this.home;
    }
}