/* 
    tidak semua harus pake async await, jika tidak mengandung promise maka tidak usah pake asynchronous
    silahkan coba console log masing2 query
*/

const db = require("../config/connection")

//function ini tidak mengandung promise 👇
exports.getProducts = async () => {
    const productList = await db.query('select * from products')
    return productList;
}

//function ini mengandung promise query 👇
exports.createProducts = async (data) => {
    //temporary variable 👇
    let response

    const query = await db.query("insert into products set ?", [data])
    
    // validasi jika database ada perubahan isi field 👇
    if(query.affectedRows > 0 ) { 
        response = "product successfuly created"
    }else {
        response = "error when inserting product"
    }
    return response
}