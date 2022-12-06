const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');
const { auth } = require('../lib/auth');

router.get('/add', isLoggedIn, auth("coordinador"),  async (req, res) =>{
    const profesores = await pool.query('SELECT * FROM profesores WHERE profesores.rol = "profesor"');
    res.render('materias/add', {profesores});
});

router.post('/add', isLoggedIn, auth("coordinador"), async(req, res) => {
    
    const {profeCargo, nombreMateria } = req.body;
    const  nuevaMateria = {
        profeCargo,
        nombreMateria
    };
    await pool.query('INSERT INTO materias set ?' , [nuevaMateria]);
    req.flash('success', 'Materia Guardada correctamente');
    res.redirect('/materias');
});

router.get('/', isLoggedIn,   async (req, res) => {
    const materias = await pool.query('SELECT * FROM materias, profesores WHERE (profeCargo = idProfesores) ');
    res.render('materias/list', {materias});
})



router.get('/edit/:idMaterias', isLoggedIn, auth("profesor"), async (req, res) => {
    const {idMaterias} = req.params;
    const materias = await pool.query('SELECT * FROM  materias WHERE idMaterias = ?', [idMaterias]);
    res.render('materias/edit', {materia: materias[0]});
});

router.post('/edit/:id', isLoggedIn, auth("profesor"), async (req, res) => {
    const {id} = req.params;
    const {nombreMateria} = req.body;
    const editMateria = {
          nombreMateria      
    }
    await pool.query('UPDATE materias set ? WHERE idMaterias= ?', [editMateria, id]);
    req.flash('success', 'Materia Modificada correctamente');
    res.redirect('/horarios');
});





module.exports = router;