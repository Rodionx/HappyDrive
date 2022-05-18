console.log("Inicio");

const BBDDprueba = require("./DataWs");

var express = require("express");
var bodyP = require("body-parser");
var cors = require("cors");

var app = express();
var router = express.Router();

app.use(bodyP.urlencoded({extended: true}));
app.use(bodyP.json());
app.use(cors());
app.use('/API', router);

/* Obtener datos */
router.route('/users').get((request, response) => {
    BBDDprueba.getData().then(result => {
        response.json(result[0]);
    });
});

/* Insertar datos */
router.route('/newData').post((request, response) => {
    let dato = {...request.body};
    console.log(dato);
    BBDDprueba.addData(dato).then(result => {
        response.json('Se añadio correctamente');
    }, (err) => {
        console.log(err.message);
        response.json(err.message)
    });
});
//Eliminar todo
router.route('/delete').delete((request, response) => {
    BBDDprueba.deleteData()
});

router.route('/deleteTask').post((request, response) => {
    let dato = {...request.body};
    console.log(dato);
    BBDDprueba.deleteTask(dato)
});

var portcnx = process.env.PORT || 5000;
app.listen(portcnx);
console.log('fin de la aplicacion')