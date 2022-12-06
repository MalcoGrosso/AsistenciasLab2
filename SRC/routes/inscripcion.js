const express = require('express');
const router = express.Router();
const { auth } = require('../lib/auth');

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');
/*
router.get('/add', isLoggedIn, async (req, res) =>{
    const materias = await pool.query('SELECT * FROM materias ');
    res.render('horarios/add', {materias});
});

router.post('/add', isLoggedIn, async(req, res) => {
    const {materiasID, horaInicio, horaFin, lunes, martes, miercoles, jueves, viernes } = req.body;
    const  nuevoHorario = {
        materiasID,
        horaInicio,
        horaFin,
        lunes,
        martes,
        miercoles,
        jueves,
        viernes
    };
    await pool.query('INSERT INTO horarios set ?' , [nuevoHorario]);
    req.flash('success', 'Materia Guardada correctamente');
    res.redirect('/materias');
});
*/

router.get('/', isLoggedIn, auth("alumno"), async (req, res) => {
    const horarios = await pool.query('SELECT idHorarios, idAlumnos, materiasID, idMaterias, profeCargo, idProfesores, horaInicioLunes, horaFinLunes, lunes, horaInicioMartes, horaFinMartes, martes, horaInicioMiercoles, horaFinMiercoles, miercoles, horaInicioJueves, horaFinJueves, jueves, horaInicioViernes, horaFinViernes, viernes, profesores.nombre, profesores.apellido, nombreMateria FROM horarios, materias, profesores, alumnos WHERE (materiasID = idMaterias) AND (profeCargo = idProfesores) AND idAlumnos = ? ', [req.user.idAlumnos])
    const Z = await pool.query(' SELECT DISTINCT nombreMateria AS NM FROM inscripciones, materias WHERE profeCargo = profesores_id AND materias_id = idMaterias AND alumnos_id = ? ', [req.user.idAlumnos])
    res.render('inscripcion/list', {horarios, Z});
})



router.get('/agregarInscripcion/:id', auth("alumno"), isLoggedIn, async (req,  res) => {
    const {id} = req.params;
    console.log(id);
    const horarios = await pool.query('SELECT idHorarios, idAlumnos, materiasID, idMaterias, profeCargo, idProfesores, horaInicioLunes, horaFinLunes, lunes, horaInicioMartes, horaFinMartes, martes, horaInicioMiercoles, horaFinMiercoles, miercoles, horaInicioJueves, horaFinJueves, jueves, horaInicioViernes, horaFinViernes, viernes, profesores.nombre, profesores.apellido, nombreMateria FROM horarios, materias, profesores, alumnos WHERE (materiasID = idMaterias) AND (profeCargo = idProfesores) AND idAlumnos = ? AND idHorarios = ?', [req.user.idAlumnos, id])
    const [horaZ] = horarios;
    console.log(horaZ);
    const nuevaInscripcion = {
        alumnos_id: horaZ.idAlumnos,
        profesores_id: horaZ.idProfesores,
        materias_id:  horaZ.idMaterias,
        valAlumno: "Invalido"
    }
    const condi = await pool.query ('SELECT DISTINCT IF(alumnos_id = ? AND profesores_id = ? AND materias_id = ?, "YES", "NO") AS condi FROM inscripciones  ORDER BY condi DESC LIMIT 1 ', [horaZ.idAlumnos, horaZ.idProfesores, horaZ.idMaterias])
    const [con] =  condi
    console.log(con);
    console.log(condi);
    
    if(con === undefined){
        await pool.query('INSERT INTO inscripciones set ?' , [nuevaInscripcion]);
        req.flash('success', 'Inscripcion realizada correctamente, debe esperar a que el profesor accepte su solicitud');
        res.redirect('/asistencia');
    }
    
    
    else if(con.condi == "YES"  ){
        req.flash('message', 'Ya se encuentra inscripto');
        res.redirect('/asistencia');    
    }else{
    await pool.query('INSERT INTO inscripciones set ?' , [nuevaInscripcion]);
    req.flash('success', 'Inscripcion realizada correctamente');
    res.redirect('/asistencia');}
});




//-------------------------------------//

//--------------------------------------//

router.get('/listarAlumnos/:id', isLoggedIn, auth("profesor"), async (req, res) => {
    const {id} = req.params;
    const alumnos = await pool.query('SELECT DISTINCT * FROM inscripciones, alumnos WHERE alumnos_id = idAlumnos  AND materias_id = ?  ', [id]);
    const materias = await pool.query('SELECT DISTINCT * FROM materias WHERE  idMaterias = ?', [id]);
    const horarios = await pool.query('SELECT DISTINCT * FROM horarios, materias, profesores WHERE (materiasID = idMaterias) AND (profeCargo = idProfesores) AND materiasID = ?', [id])
  
    ///////////////////////////////


    switch (new Date().getDay()) {
        case 1:



        break;    
    }

    var alumitos = [];
    
    const horaIniPrincipalLunes = await pool.query('SELECT horaInicioLunes FROM `horarios` WHERE materiasID = ?', [id]);
    const horaIniFinLunes = await pool.query('SELECT horaFinLunes FROM `horarios` WHERE materiasID = ?', [id]);

    const horaIniPrincipalMartes = await pool.query('SELECT horaInicioMartes FROM `horarios` WHERE materiasID = ?', [id]);
    const horaIniFinMartes = await pool.query('SELECT horaFinMartes FROM `horarios` WHERE materiasID = ?', [id]);

    const horaIniPrincipalMiercoles = await pool.query('SELECT horaInicioMiercoles FROM `horarios` WHERE materiasID = ?', [id]);
    const horaIniFinMiercoles = await pool.query('SELECT horaFinMiercoles FROM `horarios` WHERE materiasID = ?', [id]);
    
    const horaIniPrincipalJueves = await pool.query('SELECT horaInicioJueves FROM `horarios` WHERE materiasID = ?', [id]);
    const horaIniFinJueves = await pool.query('SELECT horaFinJueves FROM `horarios` WHERE materiasID = ?', [id]);

    const horaIniPrincipalViernes = await pool.query('SELECT horaInicioViernes FROM `horarios` WHERE materiasID = ?', [id]);
    const horaIniFinViernes = await pool.query('SELECT horaFinViernes FROM `horarios` WHERE materiasID = ?', [id]);
    

    for (i = 0; i < alumnos.length; i++) {

        var arregloConflictoLunes = [];
        var arregloConflictoMartes = [];
        var arregloConflictoMiercoles = [];
        var arregloConflictoJueves = [];
        var arregloConflictoViernes = [];                                          
        const horaIniMateriasLunes = await pool.query('SELECT DISTINCT nombreMateria, horaInicioLunes FROM horarios, inscripciones, materias WHERE  materiasID = materias_id AND horaInicioLunes != "" AND materiasID = idMaterias AND materiasID != ? AND alumnos_id = ?',  [id, alumnos[i].alumnos_id ]);  
        const horaFinalMateriasLunes = await pool.query('SELECT DISTINCT nombreMateria, horaFinLunes FROM horarios, inscripciones, materias WHERE  materiasID = materias_id AND horaFinLunes != "" AND materiasID = idMaterias AND materiasID != ? AND alumnos_id = ?',  [id, alumnos[i].alumnos_id ]);
        const horaIniMateriasMartes = await pool.query('SELECT DISTINCT nombreMateria, horaInicioMartes FROM horarios, inscripciones, materias WHERE  materiasID = materias_id AND horaInicioMartes != "" AND materiasID = idMaterias AND materiasID != ? AND alumnos_id = ?',  [id, alumnos[i].alumnos_id ]);  
        const horaFinalMateriasMartes = await pool.query('SELECT DISTINCT nombreMateria, horaFinMartes FROM horarios, inscripciones, materias WHERE  materiasID = materias_id AND horaFinMartes != "" AND materiasID = idMaterias AND materiasID != ? AND alumnos_id = ?',  [id, alumnos[i].alumnos_id ]);
        const horaIniMateriasMiercoles = await pool.query('SELECT DISTINCT nombreMateria, horaInicioMiercoles FROM horarios, inscripciones, materias WHERE  materiasID = materias_id AND horaInicioMiercoles != "" AND materiasID = idMaterias AND materiasID != ? AND alumnos_id = ?',  [id, alumnos[i].alumnos_id ]);  
        const horaFinalMateriasMiercoles = await pool.query('SELECT DISTINCT nombreMateria, horaFinMiercoles FROM horarios, inscripciones, materias WHERE  materiasID = materias_id AND horaFinMiercoles != "" AND materiasID = idMaterias AND materiasID != ? AND alumnos_id = ?',  [id, alumnos[i].alumnos_id ]);
        const horaIniMateriasJueves = await pool.query('SELECT DISTINCT nombreMateria, horaInicioJueves FROM horarios, inscripciones, materias WHERE  materiasID = materias_id AND horaInicioJueves != "" AND materiasID = idMaterias AND materiasID != ? AND alumnos_id = ?',  [id, alumnos[i].alumnos_id ]);  
        const horaFinalMateriasJueves = await pool.query('SELECT DISTINCT nombreMateria, horaFinJueves FROM horarios, inscripciones, materias WHERE  materiasID = materias_id AND horaFinJueves != "" AND materiasID = idMaterias AND materiasID != ? AND alumnos_id = ?',  [id, alumnos[i].alumnos_id ]);
        const horaIniMateriasViernes = await pool.query('SELECT DISTINCT nombreMateria, horaInicioViernes FROM horarios, inscripciones, materias WHERE  materiasID = materias_id AND horaInicioViernes != "" AND materiasID = idMaterias AND materiasID != ? AND alumnos_id = ?',  [id, alumnos[i].alumnos_id ]);  
        const horaFinalMateriasViernes = await pool.query('SELECT DISTINCT nombreMateria, horaFinViernes FROM horarios, inscripciones, materias WHERE  materiasID = materias_id AND horaFinViernes != "" AND materiasID = idMaterias AND materiasID != ? AND alumnos_id = ?',  [id, alumnos[i].alumnos_id ]);
        
        for (z = 0; z < horaIniMateriasLunes.length; z++) {
            if(horaIniPrincipalLunes[0].horaInicioLunes >= horaIniMateriasLunes[z].horaInicioLunes && horaIniPrincipalLunes[0].horaInicioLunes >= horaFinalMateriasLunes[z].horaFinLunes || horaIniFinLunes[0].horaFinLunes <= horaIniMateriasLunes[z].horaInicioLunes && horaIniFinLunes[0].horaFinLunes <= horaFinalMateriasLunes[z].horaFinLunes || horaIniPrincipalLunes[0].horaInicioLunes == null){  
            }else{
                arregloConflictoLunes[z] = horaIniMateriasLunes[z].nombreMateria  ;
            }  
        }

        arregloConflictoLunes = arregloConflictoLunes.filter(item => item);

        for (z = 0; z < horaIniMateriasMartes.length; z++) {
            if(horaIniPrincipalMartes[0].horaInicioMartes >= horaIniMateriasMartes[z].horaInicioMartes && horaIniPrincipalMartes[0].horaInicioMartes >= horaFinalMateriasMartes[z].horaFinMartes || horaIniFinMartes[0].horaFinMartes <= horaIniMateriasMartes[z].horaInicioMartes && horaIniFinMartes[0].horaFinMartes <= horaFinalMateriasMartes[z].horaFinMartes || horaIniPrincipalMartes[0].horaInicioMartes == null){  
            }else{
                arregloConflictoMartes[z] = horaIniMateriasMartes[z].nombreMateria  ;
            }  
        }

        arregloConflictoMiercoles = arregloConflictoMiercoles.filter(item => item);

        for (z = 0; z < horaIniMateriasMiercoles.length; z++) {
            if(horaIniPrincipalMiercoles[0].horaInicioMiercoles >= horaIniMateriasMiercoles[z].horaInicioMiercoles && horaIniPrincipalMiercoles[0].horaInicioMiercoles >= horaFinalMateriasMiercoles[z].horaFinMiercoles || horaIniFinMiercoles[0].horaFinMiercoles <= horaIniMateriasMiercoles[z].horaInicioMiercoles && horaIniFinMiercoles[0].horaFinMiercoles <= horaFinalMateriasMiercoles[z].horaFinMiercoles || horaIniPrincipalMiercoles[0].horaInicioMiercoles == null){  
            }else{
                arregloConflictoMiercoles[z] = horaIniMateriasMiercoles[z].nombreMateria  ;
            }  
        }

        arregloConflictoMiercoles = arregloConflictoMiercoles.filter(item => item);

        for (z = 0; z < horaIniMateriasJueves.length; z++) {
            if(horaIniPrincipalJueves[0].horaInicioJueves >= horaIniMateriasJueves[z].horaInicioJueves && horaIniPrincipalJueves[0].horaInicioJueves >= horaFinalMateriasJueves[z].horaFinJueves || horaIniFinJueves[0].horaFinJueves <= horaIniMateriasJueves[z].horaInicioJueves && horaIniFinJueves[0].horaFinJueves <= horaFinalMateriasJueves[z].horaFinJueves || horaIniPrincipalJueves[0].horaInicioJueves == null){  
            }else{
                arregloConflictoJueves[z] = horaIniMateriasJueves[z].nombreMateria  ;
            }  
        }

        arregloConflictoViernes = arregloConflictoViernes.filter(item => item);

        for (z = 0; z < horaIniMateriasViernes.length; z++) {
            if(horaIniPrincipalViernes[0].horaInicioViernes >= horaIniMateriasViernes[z].horaInicioViernes && horaIniPrincipalViernes[0].horaInicioViernes >= horaFinalMateriasViernes[z].horaFinViernes || horaIniFinViernes[0].horaFinViernes <= horaIniMateriasViernes[z].horaInicioViernes && horaIniFinViernes[0].horaFinViernes <= horaFinalMateriasViernes[z].horaFinViernes || horaIniPrincipalViernes[0].horaInicioViernes == null){  
            }else{
                arregloConflictoViernes[z] = horaIniMateriasViernes[z].nombreMateria  ;
            }  
        }

        arregloConflictoViernes = arregloConflictoViernes.filter(item => item);
        
        alumitos.push({ 
            usuario: alumnos[i].usuario, 
            nombre: alumnos[i].nombre, 
            apellido: alumnos[i].apellido, 
            valAlumno: alumnos[i].valAlumno, 
            conflictoLunes: arregloConflictoLunes,
            conflictoMartes: arregloConflictoMartes,
            conflictoMiercoles: arregloConflictoMiercoles,
            conflictoJueves: arregloConflictoJueves,
            conflictoViernes: arregloConflictoViernes,
            alumnos_id: alumnos[i].alumnos_id,
            materias_id: alumnos[i].materias_id
        });
    }

    res.render('inscripcion/listarAlumnos', {alumnos, materias, alumitos, horarios});
})

router.post('/cambiarEstado/:id/:mat', isLoggedIn,  auth("profesor"), async (req, res) => {
    const {id} = req.params;
    const {mat} = req.params;
                 
    const estado = await pool.query('SELECT valAlumno FROM inscripciones WHERE alumnos_id = ? AND materias_id = ?  ', [id, mat]);
    const [estadosZ] = estado;
    if(estadosZ.valAlumno == "Invalido"){
        var cambiarEsta = {
        valAlumno: "Valido"
    }
    }else{
        var cambiarEsta = {
            valAlumno: "Invalido"
        }
    }

    await pool.query('UPDATE inscripciones set ? WHERE alumnos_id = ? AND materias_id = ?' , [cambiarEsta, id, mat ], );
    res.redirect('/inscripcion/listarAlumnos/' + mat );
   
})



module.exports = router;