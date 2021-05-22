import { sendPost } from '../helpers/sendPost.js'
import { sendGet } from '../helpers/sendGet.js'
import { getName } from '../helpers/getName.js'

const form         = document.getElementById('form')
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


const response = await sendGet( 'action/get-resumen' )
if ( response.status === 200) {
    const data = await response.json()
    if ( data.sensores !== undefined ) {
        pTemperature.innerHTML = `${data.sensores.temperature}º`
        pLuminosity.innerHTML = data.sensores.luminosity
    } else {
        pTemperature.innerHTML = `${inputTemperature.value}º`
        pLuminosity.innerHTML = inputLuminosity.value
    }

    if ( data.persiana !== undefined )
        formPersiana.checked = data.persiana.state
    
    if ( data.ac !== undefined )
        formAC.checked = data.persiana.state
} else {
    Swal.fire({
        title: 'Error',
        text: 'Hubo un error',
        icon: 'error'
    })
}
