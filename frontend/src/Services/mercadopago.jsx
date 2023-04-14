import axios from 'axios'

export async function fetchMercadoPago() {
    axios.post('http://127.0.0.1:3001/api/mercadopago/create_preference').then(
        (response) => {
            window.location.href=response.data.response.body.sandbox_init_point
        }
    )
}