const express = require('express');
const app = express();
const port = 3000;

app.get('/products', (req, res) => {
    let products = [];
    for(let i = 0; i < 4; i++) {
        let product = {
            id: i + 1,
            name: `Product ${i + 1}`,
            price: Math.floor(Math.random() * 1000) + 100,
            image: `http://example.com/products/images/product${i + 1}.jpg`,
            description: `Description of Product ${i + 1}`,
            stock: Math.floor(Math.random() * 100) + 1
        };
        products.push(product);
    }
    res.json(products);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
