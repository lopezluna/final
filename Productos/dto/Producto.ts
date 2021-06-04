export class Producto {
    private id: number;
    private articulo: string;
    constructor(id:number, articulo:string, private tienda: string,
        private existencia: number) {
        this.id=id;
        this.articulo=articulo;
    }
    get _id() {
        return this.id;
    }
    get _articulo() {
        return this.articulo;
    }

    get _tienda() {
        return this.tienda;
    }

    get _existencia() {
        return this.existencia;
    }

    set _id(id){
        this.id=id;
    }

}
