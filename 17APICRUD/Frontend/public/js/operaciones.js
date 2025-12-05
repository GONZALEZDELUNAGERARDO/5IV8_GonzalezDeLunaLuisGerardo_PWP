function createNewItem() {
    event.preventDefault();

    const name = document.getElementById('newItemName').value;
    const price = parseFloat (document.getElementById('newItemPrice').value);
    const stock = parseInt (document.getElementById('newItemStock').value);
    const categoryId = document.getElementById('newItemCategoryId').value;

    let id = category_id + 1;
    const newItem = {
        name: name,
        price: price,
        stock: stock,
    };

    fetch ('products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
    })
    .then (response => response.json())
    .then (data => {
        console.log('Item creado:', data);
        
    })
    .catch (error => {
        console.error('Error al crear el item:', error);
        
    });
}