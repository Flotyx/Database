const mysql = require('mysql2');//get the client

const pool = mysql.createPool({
    host:process.env.DB_HOST,//connect to the env
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    port:process.env.DB_PORT,
    database:process.env.DB_DATABASE
    //connectionLimit
}).promise();

pool.connection((err,connection)=>{
    if(err)
        console.log('Connect Error!');
    
    else
        console.log('Connected to mySQL');

    connection.release()
})

//turn the non-promise to promise
//.env檔案是制定個人工作環境變數，像是登入資料庫要用的資料
//customize the working environment variable, like the data of the database connection
//create pool to reuse the database connection 
//if use the connectionLimit, then use the globalpool to check whether there is a pool or not?