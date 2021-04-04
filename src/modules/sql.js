var mysql = require('mysql')
var connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    database: "manhatan",
    user: "root",
    password: "",
})
connection.connect(function(error){
    if(error){
        throw error
    }else{
        console.log('[SQL] Database done!')
    }
})

async function select(table, col, question){
    if(!table){
        console.log("[SQL] incomplete question in SELECT")
        return false
    }
    if(!question){
        return await connection.query('SELECT '+ col + ' FROM '+ table , (err, result, fields) => {
            if(err){
                console.log('[SQL] '+ err)
            }else{
                return result
            }
        })
    }else if(!question && !col){
        return await connection.query('SELECT * FROM '+ table, (err, result, fields) => {
            if(err){
                console.log('[SQL] '+ err)
            }else{
                return result
            }
        })
    }else{
        return await connection.query('SELECT '+ col + ' FROM '+ table + ' WHERE '+question, (err, result, fields) => {
            if(err){
                console.log('[SQL] '+ err)
            }else{
                return result
            }
        })
    }
}

function insert(table, cols, data){
    if(!table || !cols || !data){
        return console.log("[SQL] incomplete question in INSERT")
    }
    console.log('aaaa')
    var columnas=' ('
    var datos=' ('
    for(let i = 0; i<cols.length; i++){
        if(i=0){
            columnas=columnas+cols[i]+','
            datos=datos+data[i]+','
            console.log('bbb')
        }
        if(i=cols.length-1){
            columnas=columnas+cols[i]
            datos=datos+data[i]
            columnas = columnas+')'
            datos=datos+')'
            console.log('ccc')
            break
        }
        if(i>0){
            columnas=columnas+cols[i]
            datos=datos+data[i]
            console.log('ddd')
        }
    }
    console.log('INSERT INTO '+table+columnas+' VALUES'+datos)
    connection.query('INSERT INTO '+table+columnas+' VALUES'+datos, function (err, result){
        if (err){
            throw err;
            return false
        }
        console.log(result)
    })
}

var lucas = await query(`SELECT id FROM users WHERE username = "1234"`)

async function query(abc){
    return await connection.query(abc, (err, data, fields) => {
        if(err){
            throw err
        }else{
            console.log(data.length)
            return data
        }
    })
}
module.exports = {
    select,
    insert,
    query
}