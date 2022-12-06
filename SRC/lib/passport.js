const e = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('./helpers');

passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, usuario, password, done) => {
    let myVar = undefined
    
    let Alumno = await pool.query('SELECT * FROM alumnos WHERE usuario = ?', [usuario]);
    let Alu = Alumno[0];
    let Profesor = await pool.query('SELECT * FROM profesores WHERE usuario = ?', [usuario]);
    let Profe = Profesor[0];
    let Coordinador = await pool.query('SELECT * FROM coordinadores WHERE usuario = ?', [usuario]);
    let Coor = Coordinador[0];
    
    
    if(  Alumno.length > 0) {
        
        const rows = await pool.query('SELECT * FROM alumnos WHERE usuario = ?', [usuario]);
        
   if (rows.length > 0) {
      const user = rows[0];
       const validPassword = await helpers.matchPassword(password, user.password);
       if (validPassword){
           done(null, user, req.flash('success' , 'Bienvenido ' + user.nombre));
       } else {
           done(null, false, req.flash('message' , 'Password incorrecto'));
       }
   } else {
       return done(null, false, req.flash('message' , 'Nombre de usuario no existe'));
   }

    } 
    
    else if (Profesor.length > 0) {
        
        const rows = await pool.query('SELECT * FROM profesores WHERE usuario = ?', [usuario]);
        if (rows.length > 0) {
           const user = rows[0];
            const validPassword = await helpers.matchPassword(password, user.password);
            if (validPassword){
                done(null, user, req.flash('success' , 'Bienvenido ' + user.nombre));
            } else {
                done(null, false, req.flash('message' , 'Password incorrecto'));
            }
        } else {
            return done(null, false, req.flash('message' , 'Nombre de usuario no existe'));
        }

    } 
    
    else if (Coordinador.length > 0){
        const rows = await pool.query('SELECT * FROM coordinadores WHERE usuario = ?', [usuario]);
        
        if (rows.length > 0) {
           const user = rows[0];
            const validPassword = await helpers.matchPassword(password, user.password);
            if (validPassword){
                done(null, user, req.flash('success' , 'Bienvenido ' + user.nombre));
            } else {
                done(null, false, req.flash('message' , 'Password incorrecto'));
            }
        } else {
            return done(null, false, req.flash('message' , 'Nombre de usuario no existe'));
        }

    }

    else if ((Alu == myVar) ){
         return done(null, false, req.flash('message' , 'La persona no existe'));
    }


}));


passport.use('local.signup', new LocalStrategy({
    usernameField: 'usuario',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, usuario, password, done) => {
    const { nombre } = req.body;
    const { apellido } = req.body;
    const { rol_id } = req.body;
    const { rol } = req.body;
    

    if (rol == "alumno"){
    const newUser = {
        nombre,
        apellido,
        usuario,
        password,
        rol

    };
    newUser.password = await helpers.encryptPassword(password);
    const result = await pool.query('INSERT INTO alumnos SET ?', [newUser]);
    newUser.idAlumnos = result.insertId;
    return  done(null, newUser);
} else if ( rol == "profesor"){

    const newUser = {
        nombre,
        apellido,
        usuario,
        password,
        rol

    };
    newUser.password = await helpers.encryptPassword(password);
    const result = await pool.query('INSERT INTO profesores SET ?', [newUser]);
    newUser.idProfesores = result.insertId;
    req.flash('success', 'Usuario Creado Correctamente');
    return  done(null);
} else {
    const newUser = {
        nombre,
        apellido,
        usuario,
        password,
        rol

    };
    newUser.password = await helpers.encryptPassword(password);
    const result = await pool.query('INSERT INTO coordinadores SET ?', [newUser]);
    newUser.idCoor = result.insertId;
    req.flash('success', 'Usuario Creado Correctamente');
    return  done(null);
}
}));



passport.serializeUser((user, done) =>{
    
    done(null, {
       id: user.idAlumnos,
        rol: user.rol,
        usuario: user.usuario
    });
});

passport.serializeUser((user, done) =>{
    done(null, {
       id: user.idProfesores,
        rol: user.rol,
        usuario: user.usuario
    });
});

passport.serializeUser((user, done) =>{
    done(null, {
        id: user.idCoor,
         rol: user.rol,
         usuario: user.usuario
     });
});

passport.deserializeUser(async (user, done) =>{
   
    const rows = await pool.query('SELECT * FROM alumnos where usuario = ?' , [user.usuario]);
    done(null, rows[0]);
});

passport.deserializeUser(async (user, done) =>{
    
    const rows = await pool.query('SELECT * FROM profesores where usuario = ?' , [user.usuario]);
    done(null, rows[0]);
});

passport.deserializeUser(async (user, done) =>{
    
    const rows = await pool.query('SELECT * FROM coordinadores where usuario = ?' , [user.usuario]);
    done(null, rows[0]);
});