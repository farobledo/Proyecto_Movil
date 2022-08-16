export class Planeta {
    selected: boolean;
    constructor(public nombre:string, public color:string = "Indefinido"){
        this.nombre = nombre;
        this.color = color;
    }
    isSelected():boolean{
        return this.selected;
    }
    setSelected(s: boolean){
        this.selected = s;
    }
}