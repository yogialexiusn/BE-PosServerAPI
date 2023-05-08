const db = require("../config/connection")

// !tidak semua harus pakai async await
exports.checkout = async (order, products) => {

     // temp_variable untuk menampung data berikutnya / temporary data 👇
     let dataProducts = []
     let idProducts= []
     let updateStock = []

    //product dari frontend di mapping dan mengisi nilai temporary data diatas untuk kebutuhan query. 👇
     products.map(item => {
        dataProducts.push([
            order.no_order,
            item.id,
            item.quantity
        ]);
        idProducts.push([item.id]);
    })

    //check stock product yang ada di DB berdasarkan list id yang dikirim dari FE 👇
    const stockProduct = await db.query("SELECT stock FROM products where id in (?)", [idProducts])

    /* mapping untuk update temporary variable yang bernama updateStock
     menjadi memiliki nilai yang isi adalah data product dari FE + stock yang sudah dikalkulasi
     atau dilakukan pengurangan stock. 👇 */
    stockProduct.map((product, i) =>{
        updateStock.push([
            dataProducts[i][1],
            product.stock - dataProducts[i][2]
        ])
    });

    //RAW query untuk insert data yang sudah divalidasi diatas ke table transaksi 👇
    db.query("INSERT INTO transactions set ?", [order]);
    db.query("INSERT INTO transaction_detail (no_order, id_product, quantity) VALUES ?", [dataProducts]);
        
    //RAW query untuk update data stock product yang sudah dikalkulasi diatas ke table product 👇
    db.query('INSERT INTO products(id, stock) values ? on duplicate key update stock = values (stock)', [updateStock])
    
    // munculkan hasil response ke client atau frontend 👇
    const response = db.query("SELECT no_order, total_price, amount_paid FROM transactions where no_order = ?", [order.no_order]);
    return response;
    // if(!query.affectedRows) return " error when inserting product"
    // return "cacad succefully created!";
}


    // masukin ke tabel transaksi
    // const query = await db.query("insert into transactions set ?", [order]).
    // catch ( err=> { return err})
    
    // validasi jika query insert transaksi berhasil dieksekusi maka akan lanjut kesiini
    // if (!query.code){
    // }

       
     
        

        // masukin ke transaction detail pake variabel data product = []
        // await db.query("insert into transaction_detail (no_order, id_product, quantity) values ?",
        // [dataProducts])

