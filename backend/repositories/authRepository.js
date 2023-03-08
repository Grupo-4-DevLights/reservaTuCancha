//importing libraries
const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer");


//importing config
const {TOKEN_KEY,EXPIRES,CORREO}= require('../config/env')

//importing models
const user = require('../models/usuario')

const connection = require('../database/connection')




//create user
const register = async ({ nombre, email, password }) => {
    if (!(nombre && password && email)) {
        throw new Error('Los campos no pueden estar vacios');
    }

    const existingUser = await user.findOne({ where: { email: email } });
    if (existingUser) {
        throw new Error("El email registrado ya existe")
    }

    const execute = await connection.transaction()

    try {
        let salt = bcrypt.genSaltSync(10)
        let newPassword = bcrypt.hashSync(password, salt)
        const newUser = await user.create({ nombre: nombre,email: email, password: newPassword, rol:'socio'}, { transaction: execute });

        
        

        //create token
        const token = jwt.sign(
            { user_id: newUser.id, nombre:nombre, email:newUser.email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        )

        await execute.commit()

        return {newUser:newUser,token:token}


    } catch (error) {
        await execute.rollback()
        console.log(error)
        throw new Error(`Error al crear el usuario: ${error}`);
    }

}

//login user

const login = async(email, password) => {

    if(!(email && password)) {
        throw new Error('Los campos email y password no pueden estar vacios');
    }

    const userFound = await user.findOne({where:{email: email}})
 
    if(!userFound){
        throw new Error(`El email no existe`)
    }

    const verifyPassword = bcrypt.compareSync(password,userFound.password)

    if (!verifyPassword) {
        throw new Error('La contraseña es incorrecta')
    }

    const token = jwt.sign(
        { id: userFound.id, nombre:userFound.nombre,email:userFound.email,rol:userFound.rol },
        TOKEN_KEY, 
        {
        expiresIn: 86400, // 24 hours
        }
    );

    const options={
        expires: new Date(Date.now()+ 1*60*60*1000),
        httpOnly:true
    }

    return {token,options}
}

module.exports = {
    register,
    login
}