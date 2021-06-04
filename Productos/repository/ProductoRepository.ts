import { Producto } from '../dto/Producto';
import { PostgresConnection } from "../../shared/repository/Connections";

export class ProductoRepository {
    private pgConnection: PostgresConnection;

    constructor() {
        PostgresConnection.getConnection();
        this.pgConnection = PostgresConnection.getConnection();
    }
    save(productos: Producto): Promise<Producto> {
        //create
        return this.pgConnection.execute('INSERT INTO productos(articulo, tienda , existencia ) VALUES ($1,$2,$3) RETURNING *', [productos._articulo, productos._tienda, productos._existencia]).then(
            (res) => {
                const { id, articulo, tienda , existencia } = res.rows[0];
                return new Producto(id, articulo, tienda , existencia);
            }
        );
    }

    delete(id: any): Promise<void> {
        return this.pgConnection.execute('DELETE FROM productos WHERE id = $1', [id]).then(() => { });
    }
    update(user: Producto, id: any): Promise<Producto> {
        return this.pgConnection.execute('UPDATE productos SET articulo=$1, tienda=$2, existencia=$3 WHERE id = $4', [user._articulo, user._tienda, user._existencia, id]).then((result) => {
            user._id = id;
            return user;
        });
    }

    getAll(): Promise<Producto[]> {
        return this.pgConnection.execute('SELECT * FROM productos').then(
            (res) => {
                const rows = res.rows;
                return rows.map(row => {
                    const {id, articulo, tienda , existencia} = row;
                    return new Producto(id, articulo, tienda , existencia);
                })
            }
        );
    }

    getById(id: any): Promise<Producto> {
        return this.pgConnection.execute('SELECT * FROM productos WHERE id = $1 LIMIT 1', [id]).then(
            (res) => {
                const { id, articulo, tienda , existencia } = res.rows[0];
                return new Producto(articulo, tienda , existencia, id);
            }
        );
    }
}
