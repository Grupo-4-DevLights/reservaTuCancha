const mercadopago=require('mercadopago')


require("dotenv").config()

mercadopago.configure({
    access_token: process.env.MERCADOPAGO_KEY
})

const createPreference = async (req, res) => {
    try {
        const preference = {
            items:[{
                title: 'Reserva de cancha',
                unit_price: 100,
                quantity: 1,
                currency_id:'ARS',
                category_id:'retail'
            }],
            back_urls:{
                success: 'http://127.0.0.1:5173/perfil',
                failure: '',
                pending: ''
            },
            auto_return: 'approved',
            binary_mode:true
        }

        const response = await mercadopago.preferences.create(preference)
        res.status(200).json({response})
    } catch (error) {
        res.status(400).json({error})
    }
}

module.exports = {
    createPreference
}


