import { sendGet } from '../helpers/sendGet.js'
import { getName } from '../helpers/getName.js'

const pLuminosity  = document.getElementById('luminosidad')
const pTemperature = document.getElementById('temperatura')
const formPersiana = document.getElementById('form-persiana')
const formAC       = document.getElementById('form-ac')
const inputTemperature = document.getElementById('form-temperatura')
const inputLuminosity  = document.getElementById('form-luminosidad')
const name             = document.getElementById('name')
name.innerText = 'Casa de ' + getName()

//**************************************************************************
// Update values
const setSensores = ( temperature, luminosity ) => {
    pTemperature.innerHTML = `${ temperature }º`
    pLuminosity.innerHTML = luminosity

    inputLuminosity.value = luminosity
    inputTemperature.value = temperature
}

const response = await sendGet( 'action/get-resumen' )
if ( response.status === 200) {
    const data = await response.json()
    if ( data.sensores !== undefined ) {
        setSensores( data.sensores.temperature, data.sensores.luminosity )
    } else {
        setSensores( inputTemperature.value, inputLuminosity.value )
    }

    if ( data.persiana !== undefined )
        formPersiana.checked = data.persiana.state
    
    if ( data.ac !== undefined )
        formAC.checked = data.ac.state
} else {
    Swal.fire({
        title: 'Error',
        text: 'Hubo un error',
        icon: 'error'
    })
}

