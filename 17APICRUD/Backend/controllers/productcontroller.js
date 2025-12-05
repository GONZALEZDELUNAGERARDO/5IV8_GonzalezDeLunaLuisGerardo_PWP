import product from "../models/productmodel.js";

export const createProduct = (req, res) => {
    let cathegoryid = req.body.cathegoryid;
    if(!req.body.name || (!isNaN(parseInt(cathegoryid)) && cathegoryid === 0 )){
        res.status(400).send({message: 'El nombre del producto y la categoria son requeridos'});
        return;
    }

    const newProduct = new product({
        cathegoryid: req.body.cathegoryid,
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock,
    });

    let id = req.body.id;
    console.log('ID recibido:', id);
    if (id && id != 0 && typeof id === 'number' ? true : false) {product.id = id;}

    console.log('Nuevo producto a crear:', newProduct);

    product.create(newProduct, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Ocurrio un error al crear el producto',
            });
            
        }else{
        res.send({message : `Product ${data.name} con id ${data.name} creado exitosamente & categoria id ${data.cathegoryid} creada exitosamente`});
        }
    });
};