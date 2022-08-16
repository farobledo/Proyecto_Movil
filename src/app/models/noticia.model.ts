export class Noticia {
    favorita: boolean;
    leyendo: boolean;

    constructor (public id: number = 0, public titulo: string ="", public categoria: string = "",
                 public nota: string = "", public countReview: number = 0) {
        this.id = id;
        this.titulo = titulo;
        this.categoria = categoria;
        this.nota = nota;
        this.countReview = countReview;
        this.favorita = false;
        this.leyendo = false;
    }
}