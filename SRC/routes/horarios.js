const express = require('express');
const { ResultSetHeaderPacket } = require('mysql/lib/protocol/packets');
const router = express.Router();
const handlebars = require("handlebars");
const fs = require("fs");
const { auth } = require('../lib/auth');

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add', isLoggedIn, auth("profesor"), async (req, res) =>{
    console.log(req.user.idProfesores)
    const materias = await pool.query('SELECT * FROM materias, profesores WHERE profeCargo = idProfesores AND idProfesores = ?  ',  [req.user.idProfesores]);
    res.render('horarios/add', {materias});
});

router.post('/add', isLoggedIn, auth("profesor"), async(req, res) => {
    let myVar = undefined;
    var {materiasID, horaInicioLunes, horaFinLunes, lunes, horaInicioMartes, horaFinMartes, martes, horaInicioMiercoles, horaFinMiercoles, miercoles, horaInicioJueves, horaFinJueves, jueves, horaInicioViernes, horaFinViernes, viernes } = req.body;
    console.log(horaInicioLunes);
    if( horaInicioLunes === "" && horaFinLunes === ""){
        horaInicioLunes = null;
        horaFinLunes = null;
    }
    if( horaInicioMartes === "" && horaFinMartes === ""){
        horaInicioMartes = null;
        horaFinMartes = null;
    }
    if( horaInicioMiercoles === "" && horaFinMiercoles === ""){
        horaInicioMiercoles = null;
        horaFinMiercoles = null;
    }
    if( horaInicioJueves === "" && horaFinJueves === ""){
        horaInicioJueves = null;
        horaFinJueves = null;
    }
    if( horaInicioViernes === "" && horaFinViernes === ""){
        horaInicioViernes = null;
        horaFinViernes = null;
    }
    const  nuevoHorario = {
        materiasID,
        horaInicioLunes,
        horaFinLunes,
        lunes,
        horaInicioMartes,
        horaFinMartes,
        martes,
        horaInicioMiercoles,
        horaFinMiercoles,
        miercoles,
        horaInicioJueves,
        horaFinJueves,
        jueves,
        horaInicioViernes,
        horaFinViernes,
        viernes
    };

    const materias = await pool.query('SELECT materiasID FROM `horarios` WHERE materiasID = ?  ',  [materiasID]);
    console.log(materias[0]);
    if( materias[0] == myVar){
        await pool.query('INSERT INTO horarios set ?' , [nuevoHorario]);
        req.flash('success', 'Materia Guardada correctamente');
        res.redirect('/materias');
    }else{
        req.flash('message', 'Ya se encuentra cargada esta materia');
        res.redirect('/materias');
    }

});

router.get('/', isLoggedIn, auth("profesor"), async (req, res) => {
    
    const horarios = await pool.query('SELECT * FROM horarios, materias, profesores WHERE (materiasID = idMaterias) AND (profeCargo = idProfesores) AND idProfesores = ? ' , [req.user.idProfesores]);
    res.render('horarios/list', {horarios});
})


router.get('/asistencia/:id/:materia', isLoggedIn, auth("profesor"), async (req, res) => {
    const {id} = req.params;
    const {materia} = req.params;
    const fecha = await pool.query('SELECT DISTINCT fecha FROM asistencias, horarios, alumnos WHERE horID = idHorarios AND alumID = idAlumnos AND horID = ?', [id])
    const asist = await pool.query('SELECT DISTINCT usuario, nombre, apellido, fecha, presente FROM asistencias, horarios, alumnos WHERE horID = idHorarios AND alumID = idAlumnos AND horID = ? ', [id]);
    const nombreMat = await pool.query('SELECT nombreMateria FROM `materias` WHERE idMaterias = ?', [materia]);

    //////////////////////////
    const asist5 = await pool.query('CALL PR_TABLA(?,?)', [id, materia]);
    const [asistZZ] = asist5;
    const keys = [...new Set(asistZZ.flatMap((content) => Object.keys(content)))];
    const titleKeys = keys.map((key) => key.replace('_', '/'));
    res.render('horarios/asistencia', {asist, fecha, id,  asistZZ , titleKeys, keys, nombreMat});
});

module.exports = router;