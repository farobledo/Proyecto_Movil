import { Injectable } from "@angular/core";

@Injectable()
export class FuncionalidadService {
    private funcionalidad: Array<string> = [];

    agregar(t: string) {
        this.funcionalidad.push(t);
    }

    buscar() {
        return this.funcionalidad;
    }
}