const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isLoggedIn, isNotLLoggedIn } = require('../lib/auth');
const pool = require('../database');
const { auth } = require('../lib/auth');

router.get('/signup', isNotLLoggedIn, (req, res) => {
    res.render('auth/signup')
});


router.post('/signup', isNotLLoggedIn, passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true 
}));

router.get('/signin', isNotLLoggedIn, (req, res) => {
    res.render('auth/signin');
});

router.post('/signin', isNotLLoggedIn, (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash:  true
    })(req, res, next);
});
    

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile');
});

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/signin');
});

// cosas nuevas

router.get('/CrearUsuario', auth("coordinador"), (req,res) => {
    res.render('auth/crearUsuario');
});


router.post('/crearUsuario',  auth("coordinador"), passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true 
}));

router.get('/CrearUsuarioAlumno',(req,res) => {
    res.render('auth/crearUsuarioAlumno');
});


router.post('/crearUsuario/Alumno', passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true 
}));


router.get('/Login',  (req, res) => {
    res.render('auth/logUsuario');
});

router.post('/logUsuario',  (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/Login',
        failureFlash:  true
    })(req, res, next);
});


module.exports = router;