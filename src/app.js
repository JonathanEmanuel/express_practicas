import express from 'express'
import { ProductManager } from './ProductManager.js';

const app = express();
const port = 8080;
const manager = new ProductManager('data/data.json');

app.use(  express.urlencoded({extended: true} ));

app.get('/', (req, res) => {
    res.send('<h2>Bienvenidos</h1>');
})

app.get('/products', async (req, res) => {

    const { limit } = req.query;
    const products =  await manager.getProducts();
    
    if( limit ){
        res.send(   products.slice(0, limit) );
    } else {
        res.send( products );
    }
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await manager.getProductById(id);
    res.send(product);
})

app.listen( port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
})