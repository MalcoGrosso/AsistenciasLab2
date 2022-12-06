const express = require('express');
const router = express.Router();
const moment = require('moment');
const { addListener } = require('../database');
const { auth } = require('../lib/auth');
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');


function contadorDias(){

    const horaActual = new Date();
    var horaProgramada = new Date();
    horaProgramada.setHours(00);
    horaProgramada.setMinutes(00);
    horaProgramada.setSeconds(00);
    const x = horaProgramada.getTime() - horaActual.getTime();
    console.log(horaProgramada);
    console.log(horaActual);
    console.log(Math.abs(x))
    return Math.abs(x);

   
}   


async function cargaAsistencias() {
   console.log("cargaAsistencia")
    switch (new Date().getDay()) {
        case 1:
            const luneshorarios = await pool.query('SELECT idHorarios, alumnos_id, materias_id FROM  horarios ,inscripciones WHERE materias_id = materiasID AND lunes = Lunes ');
            let luneslength = luneshorarios.length;
            x = 0  
            do{
                
                const nuevaInscripcion = {
                    alumID: luneshorarios[x].alumnos_id,
                    horID: luneshorarios[x].idHorarios,
                    mateID: luneshorarios[x].materias_id,
                    presente:  "No",
                    dictado: "Si"
                }
            
                await pool.query('INSERT INTO asistencias set ?' , [nuevaInscripcion]);
            
                x = x + 1
            }while (x < luneslength)      

        break;
        
        case 2:
            const marteshorarios = await pool.query('SELECT idHorarios, alumnos_id, materias_id FROM  horarios ,inscripciones WHERE materias_id = materiasID AND martes = Martes ');
            let marteslength = marteshorarios.length;
            x = 0  
            do{
                
                const nuevaInscripcion = {
                    alumID: marteshorarios[x].alumnos_id,
                    horID: marteshorarios[x].idHorarios,
                    mateID: marteshorarios[x].materias_id,
                    presente:  "No",
                    dictado: "Si"
                }
            
                await pool.query('INSERT INTO asistencias set ?' , [nuevaInscripcion]);
            
                x = x + 1
            }while (x < marteslength)      

        break;

        case 3:
            const miercoleshorarios = await pool.query('SELECT idHorarios, alumnos_id, materias_id FROM  horarios ,inscripciones WHERE materias_id = materiasID AND miercoles = Miercoles ');
            let miercoleslength = miercoleshorarios.length;
            x = 0  
            do{
                
                const nuevaInscripcion = {
                    alumID: miercoleshorarios[x].alumnos_id,
                    horID: miercoleshorarios[x].idHorarios,
                    mateID: miercoleshorarios[x].materias_id,
                    presente:  "No",
                    dictado: "Si"
                }
            
                await pool.query('INSERT INTO asistencias set ?' , [nuevaInscripcion]);
            
                x = x + 1
            }while (x < miercoleslength)      

        break;
    
        case 4:
            const jueveshorarios = await pool.query('SELECT idHorarios, alumnos_id, materias_id FROM  horarios ,inscripciones WHERE materias_id = materiasID AND jueves = Jueves ');
            let jueveslength = jueveshorarios.length;
            x = 0  
            do{
                
                const nuevaInscripcion = {
                    alumID: jueveshorarios[x].alumnos_id,
                    horID: jueveshorarios[x].idHorarios,
                    mateID: jueveshorarios[x].materias_id,
                    presente:  "No",
                    dictado: "Si"
                }
            
                await pool.query('INSERT INTO asistencias set ?' , [nuevaInscripcion]);
            
                x = x + 1
            }while (x < jueveslength)      

        break;

        case 5:
            const vierneshorarios = await pool.query('SELECT idHorarios, alumnos_id, materias_id FROM  horarios ,inscripciones WHERE materias_id = materiasID AND viernes = Viernes ');
            let vierneslength = vierneshorarios.length;
            x = 0  
            do{
                
                const nuevaInscripcion = {
                    alumID: vierneshorarios[x].alumnos_id,
                    horID: vierneshorarios[x].idHorarios,
                    mateID: vierneshorarios[x].materias_id,
                    presente:  "No",
                    dictado: "Si"
                }
            
                await pool.query('INSERT INTO asistencias set ?' , [nuevaInscripcion]);
            
                x = x + 1
            }while (x < vierneslength)      

        break;
                
        default:  
            console.log("SABADO");
            console.log(contadorDias());
        
            
}

}



function  preguntaTiempo(){
    const horaActual = new Date();
    var horaProgramada = new Date();
    horaProgramada.setHours(00);
    horaProgramada.setMinutes(00);
    horaProgramada.setSeconds(00);
    const x = horaProgramada.getTime() - horaActual.getTime();
        if (x == 0){
            clearTimeout(asistenciaCargada)
            clearInterval(intervaloTiempo)
            setTimeout( cargaAsistencias , contadorDias());
            setInterval(preguntaTiempo, 1000)
           
        }

} 

var intervaloTiempo = setInterval(preguntaTiempo, 1000)

asistenciaCargada =setTimeout( cargaAsistencias , contadorDias());



router.get('/add', isLoggedIn, auth("profesor"), async (req, res) =>{
    const materias = await pool.query('SELECT * FROM materias ');
    res.render('horarios/add', {materias});
});

router.post('/add', isLoggedIn, auth("profesor"),  async(req, res) => {
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

router.get('/', isLoggedIn, auth("alumno"), async (req, res) => {
    const horarios = await pool.query('SELECT DISTINCT materias_id, idHorarios, idAlumnos, materiasID, idMaterias, profeCargo, idProfesores, horaInicioLunes, horaFinLunes, lunes, horaInicioMartes, horaFinMartes, martes, horaInicioMiercoles, horaFinMiercoles, miercoles, horaInicioJueves, horaFinJueves, jueves, horaInicioViernes, horaFinViernes, viernes, profesores.nombre, profesores.apellido, nombreMateria, valAlumno FROM horarios, materias, profesores, alumnos, inscripciones WHERE valAlumno = "Valido" AND (materiasID = idMaterias) AND materias_id = idMaterias AND (profeCargo = profesores_id) AND idProfesores = profeCargo AND idAlumnos = alumnos_id AND idAlumnos = ?', [req.user.idAlumnos]);
    res.render('asistencia/list', {horarios});
})



router.get('/agregarAsistencia/:id', auth("alumno"), isLoggedIn, async (req,  res) => {
    var ahora = moment();
    ahora.format('HH:mm');
    const {id} = req.params;
    const horarios = await pool.query('SELECT DISTINCT alumnos_id, idHorarios FROM inscripciones, horarios WHERE alumnos_id = ? AND idHorarios = ?', [req.user.idAlumnos, id])
    const [horaZ] = horarios;
    const nuevaInscripcion = {
        hora: ahora.format("HH:mm:ss"),
        presente:  "Si"
    }

    const  des  =  new Date();

    
    
    
    
    const dias = await pool.query  ('SELECT DISTINCT lunes,martes,miercoles,jueves,viernes FROM asistencias, horarios WHERE idHorarios = ? ' , [id])
    const [diaZ] = dias
    let dia;
    
switch (new Date().getDay()) {
  case 1:
    dia = "Lunes";

    var hor =  await pool.query('SELECT DISTINCT horaInicioLunes, horaFinLunes FROM inscripciones, horarios WHERE alumnos_id = ? AND idHorarios = ?', [req.user.idAlumnos, id] )
    var [horZ] = hor
    var  arr = horZ.horaInicioLunes.split(":")
    var base = moment(des.setHours(arr[0], arr[1], arr[2]))
    var mas30 = moment(des.setHours(arr[0], arr[1], arr[2]));
    mas30.add(30, 'm')


    if( dia == diaZ.lunes){
        console.log(ahora);
        console.log(base);
        console.log(mas30);
        if ( ahora > base && ahora < mas30){
            
            const condi = await pool.query ('SELECT DISTINCT IF(alumID = ? AND horID = ? AND horID = idHorarios AND presente = "Si" AND fecha = ? , "YES", "NO") AS condi FROM asistencias, horarios ORDER BY condi DESC LIMIT 1 ', [horaZ.alumnos_id, horaZ.idHorarios, ahora.format("YYYY-MM-DD")])
            const [con] =  condi

            console.log(condi);
            console.log(con);
            if(con.condi == "YES"){
                req.flash('message', 'Ya tiene la asistencia');
                res.redirect('/asistencia');    
            }  
            else {
                    await pool.query('UPDATE asistencias set ? WHERE alumID=? AND horID=? AND fecha=? ' , [nuevaInscripcion,horaZ.alumnos_id, horaZ.idHorarios, ahora.format("YYYY-MM-DD")]);
                    req.flash('success', 'Asistencia correctamente');
                    res.redirect('/asistencia');
                 }
    }
    else  {
        req.flash('message', 'No se pudo cargar la Asistencia correctamente');
        res.redirect('/asistencia');
    }

        }
        else  {
            req.flash('message', 'No se pudo cargar la Asistencia correctamente');
            res.redirect('/asistencia');
        }
    break;
  case 2:
     dia = "Martes";
    
     var hor =  await pool.query('SELECT DISTINCT horaInicioMartes, horaFinMartes FROM inscripciones, horarios WHERE alumnos_id = ? AND idHorarios = ?', [req.user.idAlumnos, id] )
     var [horZ] = hor
     var  arr = horZ.horaInicioMartes.split(":")
     var base = moment(des.setHours(arr[0], arr[1], arr[2]))
     var mas30 = moment(des.setHours(arr[0], arr[1], arr[2]));
     mas30.add(30, 'm')


    if( dia == diaZ.martes){
        if ( ahora > base && ahora < mas30){

            const condi = await pool.query ('SELECT DISTINCT IF(alumID = ? AND horID = ? AND horID = idHorarios AND presente = "Si" AND fecha = ? , "YES", "NO") AS condi FROM asistencias, horarios ORDER BY condi DESC LIMIT 1 ', [horaZ.alumnos_id, horaZ.idHorarios, ahora.format("YYYY-MM-DD")])
            const [con] =  condi
            if(con.condi == "YES"){
                req.flash('message', 'Ya tiene la asistencia');
                res.redirect('/asistencia');    
            }else{
          
            await pool.query('UPDATE asistencias set ? WHERE alumID=? AND horID=? AND fecha=? ' , [nuevaInscripcion,horaZ.alumnos_id, horaZ.idHorarios, ahora.format("YYYY-MM-DD")]);
            req.flash('success', 'Asistencia correctamente');
            res.redirect('/asistencia');
            }
    }
    else  {
        req.flash('message', 'No se pudo cargar la Asistencia correctamente');
        res.redirect('/asistencia');
    }
    
    }
    else  {
        req.flash('message', 'No se pudo cargar la Asistencia correctamente');
        res.redirect('/asistencia');
    }
    break;
  case 3:
    dia = "Miercoles";

    var hor =  await pool.query('SELECT DISTINCT horaInicioMiercoles, horaFinMiercoles FROM inscripciones, horarios WHERE alumnos_id = ? AND idHorarios = ?', [req.user.idAlumnos, id] )
    var [horZ] = hor
    var  arr = horZ.horaInicioMiercoles.split(":")
    var base = moment(des.setHours(arr[0], arr[1], arr[2]))
    var mas30 = moment(des.setHours(arr[0], arr[1], arr[2]));
    mas30.add(30, 'm')

    if( dia == diaZ.miercoles){
        if ( ahora > base && ahora < mas30){

            const condi = await pool.query ('SELECT DISTINCT IF(alumID = ? AND horID = ? AND horID = idHorarios AND presente = "Si" AND fecha = ? , "YES", "NO") AS condi FROM asistencias, horarios ORDER BY condi DESC LIMIT 1 ', [horaZ.alumnos_id, horaZ.idHorarios, ahora.format("YYYY-MM-DD")])
            const [con] =  condi
            if(con.condi == "YES"){
                req.flash('message', 'Ya tiene la asistencia');
                res.redirect('/asistencia');    
            }else{
          
            await pool.query('UPDATE asistencias set ? WHERE alumID=? AND horID=? AND fecha=? ' , [nuevaInscripcion,horaZ.alumnos_id, horaZ.idHorarios, ahora.format("YYYY-MM-DD")]);
            req.flash('success', 'Asistencia correctamente');
            res.redirect('/asistencia');
            }
    }
    else  {
        req.flash('message', 'No se pudo cargar la Asistencia correctamente');
        res.redirect('/asistencia');
    }
    }
    else  {
        req.flash('message', 'No se pudo cargar la Asistencia correctamente');
        res.redirect('/asistencia');
    }
    break;
  case 4:
    dia = "Jueves";
    
    var hor =  await pool.query('SELECT DISTINCT horaInicioJueves, horaFinJueves FROM inscripciones, horarios WHERE alumnos_id = ? AND idHorarios = ?', [req.user.idAlumnos, id] )
    var [horZ] = hor
    var  arr = horZ.horaInicioJueves.split(":")
    var base = moment(des.setHours(arr[0], arr[1], arr[2]))
    var mas30 = moment(des.setHours(arr[0], arr[1], arr[2]));
    mas30.add(30, 'm')


    if( dia == diaZ.jueves){
        console.log(ahora);
        console.log(base);
        console.log(mas30);
        if ( ahora > base && ahora < mas30){

        const condi = await pool.query ('SELECT DISTINCT IF(alumID = ? AND horID = ? AND horID = idHorarios AND presente = "Si" AND fecha = ? , "YES", "NO") AS condi FROM asistencias, horarios ORDER BY condi DESC LIMIT 1 ', [horaZ.alumnos_id, horaZ.idHorarios, ahora.format("YYYY-MM-DD")])
        const [con] =  condi
        if(con.condi == "YES"){
            req.flash('message', 'Ya tiene la asistencia');
            res.redirect('/asistencia');    
        }else{
      
        await pool.query('UPDATE asistencias set ? WHERE alumID=? AND horID=? AND fecha=? ' , [nuevaInscripcion,horaZ.alumnos_id, horaZ.idHorarios, ahora.format("YYYY-MM-DD")]);
        req.flash('success', 'Asistencia correctamente');
        res.redirect('/asistencia');
        }
    }
    else  {
        req.flash('message', 'No se pudo cargar la Asistencia correctamente');
        res.redirect('/asistencia');
    }
    }
    else  {
        req.flash('message', 'No se pudo cargar la Asistencia correctamente');
        res.redirect('/asistencia');
    }
    break;
  case 5:
    dia = "Viernes";

    var hor =  await pool.query('SELECT DISTINCT horaInicioViernes, horaFinViernes FROM inscripciones, horarios WHERE alumnos_id = ? AND idHorarios = ?', [req.user.idAlumnos, id] )
    var [horZ] = hor
    var  arr = horZ.horaInicioViernes.split(":")
    var base = moment(des.setHours(arr[0], arr[1], arr[2]))
    var mas30 = moment(des.setHours(arr[0], arr[1], arr[2]));
    mas30.add(30, 'm')


    if( dia == diaZ.viernes){
        if ( ahora > base && ahora < mas30){

            const condi = await pool.query ('SELECT DISTINCT IF(alumID = ? AND horID = ? AND horID = idHorarios AND presente = "Si" AND fecha = ? , "YES", "NO") AS condi FROM asistencias, horarios ORDER BY condi DESC LIMIT 1 ', [horaZ.alumnos_id, horaZ.idHorarios, ahora.format("YYYY-MM-DD")])
            const [con] =  condi
            if(con.condi == "YES"){
                req.flash('message', 'Ya tiene la asistencia');
                res.redirect('/asistencia');    
            }else{
          
            await pool.query('UPDATE asistencias set ? WHERE alumID=? AND horID=? AND fecha=? ' , [nuevaInscripcion,horaZ.alumnos_id, horaZ.idHorarios, ahora.format("YYYY-MM-DD")]);
            req.flash('success', 'Asistencia correctamente');
            res.redirect('/asistencia');
            }
    }
    else  {
        req.flash('message', 'No se pudo cargar la Asistencia correctamente');
        res.redirect('/asistencia');
    }
    }
    else  {
        req.flash('message', 'No se pudo cargar la Asistencia correctamente');
        res.redirect('/asistencia');
    }
    break;
  default:  
    req.flash('message', 'No se pudo cargar la Asistencia correctamente');
    res.redirect('/asistencia');

   
}

});



router.get('/asisPD', isLoggedIn, auth("profesor"), async (req, res) => {

    
    var z = Date.parse(req.query.asisSel);
    var y = moment(z);
    
   const asi = await pool.query('SELECT DISTINCT usuario, nombre, apellido, presente, dictado FROM asistencias, horarios, alumnos WHERE horID = idHorarios AND alumID = idAlumnos AND horID = ? AND fecha = ?', [req.query.id, y.format("YYYY-MM-DD") ]);
   const fecha = await pool.query('SELECT DISTINCT fecha FROM asistencias, horarios, alumnos WHERE horID = idHorarios AND alumID = idAlumnos AND horID = ? AND fecha = ? ', [req.query.id, y.format("YYYY-MM-DD") ]);
   const dic = await pool.query('SELECT DISTINCT horID, fecha FROM asistencias, horarios WHERE horID = idHorarios AND horID = ? AND fecha = ? ', [req.query.id, y.format("YYYY-MM-DD") ]);
   const nombreMat = await pool.query('SELECT DISTINCT nombreMateria FROM horarios, materias WHERE materiasID = idMaterias AND idHorarios = ?' , [req.query.id]);
    
   
    res.render('asistencia/asisPD', {asi, fecha, dic, nombreMat});
});

router.post('/asisPD', isLoggedIn, auth("profesor"), async(req, res) => {
    
    
    
    
    
    res.redirect('/asistencia/asisPD');
});


//---------------------------------------//

router.post('/dictadoClase/:fecha/:horarioID', isLoggedIn,  async (req, res) => {
    const {fecha} = req.params;
    const {horarioID} = req.params;    
        var  dictadoClase = {
            presente: "No hubo dictado",
            dictado: "No"
        }
      

    await pool.query('UPDATE asistencias set ? WHERE horID = ? AND fecha = ?' , [dictadoClase, horarioID, fecha], );
    req.flash('success', 'Dictado de clase cambiado');
    res.redirect('/horarios'  );
   
})



router.get('/totales', isLoggedIn, auth("coordinador"), async (req, res) => {

    const todos = await pool.query('SELECT COUNT(presente) AS todos FROM asistencias ');
    const presentes = await pool.query ('SELECT COUNT(presente) AS presentes FROM asistencias WHERE presente = "Si"; ') 
    const noDictado = await pool.query ('SELECT COUNT(presente) AS presentes FROM asistencias WHERE presente = "No hubo dictado"; ') 
    const [todos1] =  todos;
    const [presentes1] =  presentes;
    const [noDictado1] =  noDictado;
    var porcentaje = Math.trunc(((presentes1.presentes ) * 100) / (todos1.todos - noDictado1.presentes));
    res.render('asistencia/totales', {porcentaje});
});




module.exports = router;








