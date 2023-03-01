const router = require('express').Router();



//rutas del controlador


//router.use('/api/auth', require('./authRoute'));
router.use('/api/cancha', require('./canchaRoutes'));
router.use('/api/usuario', require('./usuarioRoutes'));
router.use('/api/empresa', require('./empresaRoutes'))
router.use('/api/reserva',require('./reservaRoutes'))
router.use('/api/indexPage',require('./indexPage'))
router.use('/api/usersPage',require('./usersPage'))
router.use('/api/auth',require('./authRoutes'))


module.exports=router