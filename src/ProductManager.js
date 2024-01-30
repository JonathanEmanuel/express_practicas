import fs from 'fs/promises'

class ProductManager{
    static lastId = 1;

    constructor(path){
        this.path = path;
        this.products = [];
    }
    async saveFile() {
        const data = JSON.stringify( this.products, null, 2 );
        await fs.writeFile( this.path, data)
    }
    // Valida que no exista previamente el código y verifica todos los campos obligatorios
    async addProduct( product ){
        const {title, description, price, thumbnail, code, stock} = product;

        if( !title )
            return 'Falta el campo title';

        if( !description )
            return 'Falta el campo description';

        if( !price )
            return 'Falta el campo price';
        
        if( !thumbnail )
            return 'Falta el campo thumbnail';
        
        if( !code )
            return 'Falta el campo code';

        if( !stock )
            return 'Falta el campo stock';

        this.products = await this.getProducts();
        const existe = this.products.find( item => item.code === code  );

        if( existe ){
            return 'El Producto ya existe'
        }
 
        if( this.products.length > 0 ){
            product.id = this.products[ this.products.length -1 ].id + 1;
        } else {
            product.id = ProductManager.lastId;
        }
        this.products.push( product );

        ProductManager.lastId++;

        await this.saveFile();
        return 'Add Product';
    }

    async getProducts() {
        try {
            const resp = await fs.readFile( this.path, 'utf-8' );
            const products = JSON.parse( resp );
            return products;
        } catch (error) {
            console.error('Not Found File', error);
            return [];
        }
    }
    
    async getProductById( id ){
        try {
            const products = await this.getProducts();
            const product = products.find( product => product.id == id );
            return product ? product : {};

        } catch (error) {
            console.error('Error', error);
            return { error }
        }    
    }

    async deleteProduct( id ){
        try {
            this.products = await this.getProducts();
            const index = this.products.findIndex( product => product.id === id );

            if( index === -1 ){
                return 'Not Found';
            }

            this.products.splice(index, 1);
            await this.saveFile();

        } catch ( error ){
            console.error(error);
            return 'Error';
        }
    }

    async updateProduct(id, product){
        const { title, description, price, thumbnail, code, stock } = product;

        if( !title )
            return 'Falta el campo title';

        if( !description )
            return 'Falta el campo description';

        if( !price )
            return 'Falta el campo price';
        
        if( !thumbnail )
            return 'Falta el campo thumbnail';
        
        if( !code )
            return 'Falta el campo code';

        if( !stock )
            return 'Falta el campo stock s';

        this.products = await this.getProducts();

        const index = this.products.findIndex( item => item.id == id  );
        if( index === -1 ){
            return 'Pruduct Not Found'
        }

        console.log(index, this.products[index])
        this.products[index].title = title;
        this.products[index].description = description;
        this.products[index].price = price;
        this.products[index].thumbnail = thumbnail;
        this.products[index].code = code;
        this.products[index].stock = stock;

        await this.saveFile();

        return 'Ok';
    }
}

console.log('Clase')

export { ProductManager }