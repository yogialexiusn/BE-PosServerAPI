const express = require('express');
const products = express.Router();
const { getProducts, createProducts} = require("../controllers/products")

// wajib pake async await karena di dalem function nya mengandung promise
// jalur utama untuk resource endpoint products api

// api untuk get semua list product, url: http://localhost:3000/products | method GET 👇
products.route('/').get( async (req, res) => {
    res.send( await getProducts())
});

// products.route('/').get((req, res) => {
//     db.query("SELECT * FROM products")
// }
// )

// api untuk membuat dummy product, url: http://localhost:3000/products | method POST 👇
products.route('/').post( async (req, res) => {
    
    // let data = {
    //     name : req.body.name, 
    //     price : req.body.price, 
    //     stock : req.body.stock, 
    // }
    
    // AWAL 
    const { name, price, stock} = req.body

    // tampung jadi 1 object
    const data = { 
        name, price, stock
    }
    // AKHIR 

    // response untuk client 👇
    res.send(await createProducts(data))
    

});

module.exports= products
