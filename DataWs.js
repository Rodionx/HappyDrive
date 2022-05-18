const sql = require('mssql');
const cnx = require('./cnx');

//Saca los datos de la BBDD.
async function getData(){
    try {
        let pool = await sql.connect(cnx);
        let salida = await pool.request().query('SELECT * FROM t_tareas');
        console.log(date);
        return salida.recordsets;
    } catch (err){
        console.log(err);
    }
}

//Eliminar los datos de una BBDD
async function deleteData(){
    try{
        let pool = await sql.connect(cnx);
        await pool.request().query('DELETE FROM t_tareas;');
    } catch(err){
        console.log(err);
    }
}

//Eliminar tarea seleccionada.

async function deleteTask(dato){
    try {
        let pool = await sql.connect(cnx);
        await pool.request()
        .query('DELETE FROM t_tareas WHERE id ='+ dato.id + ';');
    } catch (err){
        console.log(err)
    }
}

const current = new Date();
    const date =
      current.getFullYear() +
      "-" +
      (current.getMonth() + 1) +
      "-" +
      current.getDate()

async function addData(dato){
    const consulta = "INSERT INTO t_tareas VALUES("
    const parametros = "'" + dato.nombre + "', '" + date +"');" 
    console.log(consulta + parametros);
    try {
        let pool = await sql.connect(cnx);
        let inputData = await pool.request()
        .query(consulta + parametros);
        
    return inputData.recordsets;
        
    } catch (err){
        throw new Error (`Hay un error en el procedimiento ${err.procName}... ${err.message}`)
    }
}

module.exports = {
    getData: getData,
    addData: addData,
    deleteData: deleteData,
    deleteTask: deleteTask
}
