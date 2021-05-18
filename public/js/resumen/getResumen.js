import { sendGet } from '../helpers/sendGet.js'

const response = await sendGet( 'action/get-resumen' )

if ( response.status === 200) {
    const data = await response.json()
    console.log(data);
} else {
    Swal.fire({
        title: 'Error',
        text: 'Hubo un error',
        icon: 'error'
    })
}


