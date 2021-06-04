import { PersonalRepository } from "../repository/PersonalRepository";
import {Personal} from '../dto/Personal';
export class PersonalApplication {
    constructor(private repository: PersonalRepository) { }

    save(user: Personal) {
        return this.repository.save(user);
    }
    delete(id) {
        return this.repository.delete(id);
    }

    update(user: Personal, id) {
        return this.repository.update(user, id);
    }

    getAll() {
        return this.repository.getAll();
    }

    getById(id) {
        return this.repository.getById(id);
    }
}