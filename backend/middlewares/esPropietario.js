const jwt= require('jsonwebtoken')
const {TOKEN_KEY}= require('../config/env')


const esPropietario = async (req, res, next) => {
    try {
      const token = req.cookies.token;  
      const user =  jwt.verify(token, TOKEN_KEY);
      console.log(user)

      if (user.rol === "propietario") {
        next();
        
      }else{
        return res.status(403).json({ message: "Debe tener el rol de propietario!" })
      }
    } catch (error) {
      return res.status(403).send({ message:'Debe estar logueado'});
    }
};

module.exports=esPropietario