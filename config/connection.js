// !Setup File Database Connection | standar format
const mysql = require('mysql');
const env= require('dotenv');
const util = require('util'); // 👈 bawaan node js untuk kebutuhan penggunaan asynchronous

env.config();

// konfigurasi database credentials | nilainya dari file .env 👇
const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database:process.env.DB_NAME
    });

connection.query = util.promisify(connection.query).bind(connection); // supaya query bisa async await

// validasi untuk logging koneksi database 👇
connection.connect((err) => {
    if (err){
        console.log("error", err)
    }
    console.log('connect lancar')
})


module.exports = connection // 👈 supaya query bisa di akses diluar file ini