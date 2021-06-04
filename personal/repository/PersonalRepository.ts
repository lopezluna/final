import { Personal } from '../dto/Personal';
import { PostgresConnection } from "../../shared/repository/Connections";

export class PersonalRepository {
    private pgConnection: PostgresConnection;

    constructor() {
        PostgresConnection.getConnection();
        this.pgConnection = PostgresConnection.getConnection();
    }
    save(personal: Personal): Promise<Personal> {

        return this.pgConnection.execute('INSERT INTO personal(nombre, cargo, tienda ) VALUES ($1,$2,$3) RETURNING *', [personal._nombre, personal._cargo, personal._tienda]).then(
            (res) => {
                const { id, nombre, cargo, tienda } = res.rows[0];
                return new Personal(id, nombre, cargo, tienda);
            }
        );
    }

    delete(id: any): Promise<void> {
        return this.pgConnection.execute('DELETE FROM personal WHERE id = $1', [id]).then(() => { });
    }
    update(user: Personal, id: any): Promise<Personal> {
        return this.pgConnection.execute('UPDATE personal SET nombre=$1, cargo=$2, tienda=$3 WHERE id = $4', [user._nombre, user._cargo, user._tienda, id]).then((result) => {
            user._id = id;
            return user;
        });
    }

    getAll(): Promise<Personal[]> {
        return this.pgConnection.execute('SELECT * FROM personal').then(
            (res) => {
                const rows = res.rows;
                return rows.map(row => {
                    const {id, nombre, cargo, tienda} = row;
                    return new Personal(id, nombre, cargo, tienda);
                })
            }
        );
    }

    getById(id: any): Promise<Personal> {
        return this.pgConnection.execute('SELECT * FROM personal WHERE id = $1 LIMIT 1', [id]).then(
            (res) => {
                const { id, nombre, cargo, tienda } = res.rows[0];
                return new Personal(nombre, cargo, tienda, id);
            }
        );
    }
}
