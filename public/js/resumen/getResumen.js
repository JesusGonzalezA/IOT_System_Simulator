const temperature = document.getElementById('temperature')
const luminosity  = document.getElementById('luminosity')
const persianas   = document.getElementById('persianas')
const aire        = document.getElementById('aire')


//--------------------------------------------------------------------------

import { sendGet } from '../helpers/sendGet.js'

const response = await sendGet( 'action/get-resumen' )

if ( response.status === 200) {
    const data = await response.json()
    
    if ( data.sensores === undefined ) {
        temperature.innerHTML = luminosity.innerHTML = ' No hay medidas '
        temperature.style.backgroundColor = luminosity.style.backgroundColor = 'brown'
        temperature.style.color = luminosity.style.color = 'white'
    } else {
        temperature.innerHTML = data.sensores.temperature
        luminosity.innerHTML  = data.sensores.luminosity
    }
    
    if ( data.ac === undefined ) {
        aire.innerHTML = ' No hay medidas '
        aire.style.backgroundColor = 'brown'
        aire.style.color = 'white'
    } else {
        aire.innerHTML   = ( data.ac.state )? 'Encendido' : 'Apagado'
        aire.style.color = ( data.ac.state )? 'red' : 'green'
    }

    if ( data.persiana === undefined ) {
        persianas.innerHTML = ' No hay medidas '
        persianas.style.backgroundColor = 'brown'
        persianas.style.color = 'white'
    } else {
        persianas.innerHTML   = ( data.persiana.state )? 'Subidas' : 'Bajadas'
        persianas.style.color = ( data.persiana.state )? 'red' : 'green'
    }
    
} else {
    Swal.fire({
        title: 'Error',
        text: 'Hubo un error',
        icon: 'error'
    })
}


