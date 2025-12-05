import sql from '../dbconfig.js';
class product {
    constructor(product) {
        this.cathegoryid = product.cathegoryid;
        this.name = product.name;
        this.price = product.price;
        this.stock = product.stock;
    }
    //vamos a crear un producto 
    static create(newProduct, result) {
        if (newProduct.cathegoryid && newProduct.name && newProduct.id) {
            sql.query('INSERT INTO products VALUES (?,?,?,?)',
                newProduct[newProduct.id, newProduct.cathegoryid, newProduct.name, newProduct.price, newProduct.stock],
                (err, res) => {
                    if (err) {
                        console.log('Error al crear el producto', err);
                        result(err, null);
                        return;
                    }
                    console.log('Producto creado existosamente', {id: res.insertId, ...newProduct});
                    result(null, {id:res.insertId, ...newProduct});
                });

        } else {
            sql.query('INSERT INTO products (cathegoryid, name, price, stock) VALUES (?,?,?,?)', [newProduct.cathegoryid, newProduct.name, newProduct.price, newProduct.stock],
                (err, res) => {
                    if (err) {
                        console.log(`Error al crear el producto con el nombre ${newProduct.ProductName}`, err);
                        result(null, );
                        return;
                    }
                    console.log('Producto creado existosamente', {id: res.insertId, ...newProduct});
                    result(null, {id: res.insertId, ...newProduct});
                });
        }
    }
}

export default product;