import { ProductoApplication } from "../application/ProductsApplication";
import { Producto } from "../dto/Producto";
import { ProductoRepository } from "../repository/ProductoRepository";

const express = require('express')
const productsRouter = express.Router()

//OBTENER LISTADO DE USUARIOS
productsRouter.get('/productos', (request, response) => {
    const userApp = new ProductoApplication(new ProductoRepository());
    userApp.getAll().then(result => {
        response.status(201);
        response.send(result)
    })
})

//CREAR USUARIOS
productsRouter.post('/productos', (request, response) => {
    const userApp = new ProductoApplication(new ProductoRepository());
    const { articulo, tienda, existencia  } = request.body;
    userApp.save(new Producto( 0, articulo, tienda , existencia )).then(result => {
        response.status(201);
        response.send(result);
    });

})

//EDITAR UN USUARIO
productsRouter.put('/productos/:id', (request, response) => {
    const userApp = new ProductoApplication(new ProductoRepository());
    const { articulo, tienda, existencia  } = request.body;
    userApp.update(new Producto(0, articulo, tienda , existencia), request.params.id).then(result => {
        response.status(201);
        response.send(result);
    });
})

//OBTENER DETALLES DE LOS USUARIOS
productsRouter.get('/productos/:id', (request, response) => {
    const userApp = new ProductoApplication(new ProductoRepository());
    userApp.getById(request.params.id).then(result => {
        response.status(201);
        response.send(result);
    });
})


productsRouter.delete('/productos/:id',(request,response)=>{
    const userApp = new ProductoApplication(new ProductoRepository());
    userApp.delete(request.params.id).then(result => {
        response.status(201);
        response.send(result);
    });
});

export { productsRouter };