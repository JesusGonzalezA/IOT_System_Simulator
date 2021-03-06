import { getName } from '../helpers/getName.js'
import { sendGet } from '../helpers/sendGet.js'

//**************************************************************************

const temperature = document.getElementById('temperature')
const luminosity  = document.getElementById('luminosity')
const persianas   = document.getElementById('persianas')
const aire        = document.getElementById('aire')
const name        = document.getElementById('name')

name.innerText = 'Casa de ' + getName()

//--------------------------------------------------------------------------

export const setPersiana = ( value ) => {
    persianas.innerHTML   = ( value )? 'Subidas' : 'Bajadas'
    persianas.style.color = ( value )? 'red' : 'green'
}

export const setAC = ( value ) => {
    aire.innerHTML   = ( value )? 'Encendido' : 'Apagado'
    aire.style.color = ( value )? 'red' : 'green'
}

export const setSensores = ( { luminosity : lValue, temperature : tValue } ) => {
    temperature.innerHTML = tValue
    luminosity.innerHTML  = lValue
}

const response = await sendGet( 'action/get-resumen' )

if ( response.status === 200) {
    const data = await response.json()
    
    if ( data.sensores === undefined ) {
        temperature.innerHTML = luminosity.innerHTML = ' No hay medidas '
        temperature.style.backgroundColor = luminosity.style.backgroundColor = 'brown'
        temperature.style.color = luminosity.style.color = 'white'
    } else {
        setSensores( data.sensores )
    }
    
    if ( data.ac === undefined ) {
        aire.innerHTML = ' No hay medidas '
        aire.style.backgroundColor = 'brown'
        aire.style.color = 'white'
    } else {
        setAC( data.ac.state )
    }

    if ( data.persiana === undefined ) {
        persianas.innerHTML = ' No hay medidas '
        persianas.style.backgroundColor = 'brown'
        persianas.style.color = 'white'
    } else {
        setPersiana( data.persiana.state )
    }
    
} else {
    Swal.fire({
        title: 'Error',
        text: 'Hubo un error',
        icon: 'error'
    })
}



