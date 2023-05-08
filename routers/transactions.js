const express = require('express');
const transactions = express.Router()
const { randomOrderNumber} = require("../helpers/utils")
const { checkout } = require("../controllers/transactions")

// jalur utama untuk akses resource endpoint transaction API 👇
transactions.route('/').post(async ( req, res) => {
    const { total_price, amount_paid, products } = req.body //👈 data yg dikirim client 

    //wrap jadi 1 object
    const order = {
        no_order: randomOrderNumber(), total_price, amount_paid
    }

    console.log("total_price = " + total_price);
    console.log("amount_paid = " + amount_paid);
    console.log("products = " + products);

    // kirim balik response untuk client
    res.send(await checkout(order, products))
})

module.exports= transactions