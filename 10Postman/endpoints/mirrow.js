const mirrow =(req,res)=> {
    const metodos = [{
        method: 'POST',
        hasBody : true,
        purpouse: "El método post se utiliza para enviar una entidad a un recurso especifico, causando a menudo un cambio en el estado o efectos secundarios del servidor."
    },{
        method: 'PUT',
        hasBody: true,
        purpouse: "El metodo put remplaza todas las representaciones actuales del recurso de destino con carga util de la petición."
    },{
        method: 'PATCH',
        hasBody: true,
        purpouse: "El metodo patch es utilizado para aplicar modificaciones parciales a un recurso."
    },{
        method: 'HEAD',
        hasBody: false,
        purpouse: "El metodo head pide una respuesta identica a la de una petición GET, pero sin el cuerpo de la respuesta."
    },{
        method: 'GET',
        hasBody: false,
        purpouse: "El metodo get solicita una representación de un recurso especifico. Las peticiones que usan el metodo GET solo deben recuperar datos"
    },{
        method: 'DELET',
        hasBody: false,
        purpouse: "El metodo DELET elimina el recurso especificado."
    
    }];

    const requestMethod = metodos.find(
        m => m.method === req.method) || {
            method: req.method,
            hasBody: false,
            purpouse: "No tiene un body, no hay una respuesta, metodo no soportado"
        };

        requestMethod.purpouse+= requestMethod.hasBody ? "Tiene cuerpo" : "No tiene cuerpo";
        if(requestMethod.hasBody){
            req.body; //js debe de parasear mediante un JSON el objeto necesario
            res.json ({...req.body, ruta_consumida: req.route.path, ...requestMethod});
        }else{ 
            res.json({ruta_consumida: req.originalURL, ...requestMethod})
        }
};

module.exports = mirrow;