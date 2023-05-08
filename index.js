const express = require('express');
const app = express(); // 👈 deklarasi express js

const bodyParser = require('body-parser'); // 👈 standar lib agar api bisa menerima request body yang formatnya POST atau UPDATE
app.use(bodyParser.json());

const cors = require('cors'); // 👈 standar lib supaya API tidak terblokir ketika digunakan oleh client atau frontend
app.use(cors());

const port = 3000;

// gerbang utama nyalanya api ada disini, url http://localhost:3000 👇
app.get('/', (req, res) => {
  res.send('Hello Worsdld!')
});

// deklarasi awal untuk routes atau resource API 👇
const products = require('./routers/products');
const transactions = require('./routers/transactions')

// memakai resource yang ada didalam folder routers 👇
app.use('/products', products)
app.use('/transactions', transactions)

// standar format untuk menyalakan server 👇
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});