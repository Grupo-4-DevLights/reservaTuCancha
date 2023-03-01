const usuario = require('../models/usuario')
const jwt= require('jsonwebtoken')
const {TOKEN_KEY}= require('../config/env')

const esAdministrador = async (req, res, next) => {
    try {
      const token = req.cookies.token;  
      const user =  jwt.verify(token, TOKEN_KEY);
      console.log(user)

      if (user.rol === "administrador") {
        next();
        
      }else{
        return res.status(403).json({ message: "Debe tener el rol de administrador!" })
      }
    } catch (error) {
      return res.status(403).send({ message:'Debe estar logueado'});
    }
};

module.exports=esAdministrador