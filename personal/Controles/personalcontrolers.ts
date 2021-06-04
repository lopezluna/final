import { PersonalApplication } from "../application/personalApplication";
import { Personal } from "../dto/Personal";
import { PersonalRepository } from "../repository/PersonalRepository";

const express = require('express')
const personalRouter = express.Router()

//OBTENER LISTADO DE USUARIOS
personalRouter.get('/personal', (request, response) => {
    const userApp = new PersonalApplication(new PersonalRepository());
    userApp.getAll().then(result => {
        response.status(201);
        response.send(result)
    })
})

//CREAR USUARIOS
personalRouter.post('/personal', (request, response) => {
    const userApp = new PersonalApplication(new PersonalRepository());
    const { nombre, cargo, tienda } = request.body;
    userApp.save(new Personal( 0, nombre, cargo, tienda )).then(result => {
        response.status(201);
        response.send(result);
    });

})

//EDITAR UN USUARIO
personalRouter.put('/personal/:id', (request, response) => {
    const userApp = new PersonalApplication(new PersonalRepository());
    const { nombre, cargo, tienda  } = request.body;
    userApp.update(new Personal(0,nombre, cargo, tienda), request.params.id).then(result => {
        response.status(201);
        response.send(result);
    });
})

//OBTENER DETALLES DE LOS USUARIOS
personalRouter.get('/personal/:id', (request, response) => {
    const userApp = new PersonalApplication(new PersonalRepository());
    userApp.getById(request.params.id).then(result => {
        response.status(201);
        response.send(result);
    });
})


personalRouter.delete('/personal/:id',(request,response)=>{
    const userApp = new PersonalApplication(new PersonalRepository());
    userApp.delete(request.params.id).then(result => {
        response.status(201);
        response.send(result);
    });
});

export { personalRouter };