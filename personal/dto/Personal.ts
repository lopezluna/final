export class Personal {
    private id: number;
    private nombre: string;
    constructor(id:number, nombre:string, private cargo: string, private tienda: string) {
        this.id=id;
        this.nombre=nombre;
    }
    get _id() {
        return this.id;
    }
    get _nombre() {
        return this.nombre;
    }

    get _cargo() {
        return this.cargo;
    }

    get _tienda() {
        return this.tienda;
    }

    set _id(id){
        this.id=id;
    }

}
