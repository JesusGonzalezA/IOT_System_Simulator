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
        formAC.checked = data.ac.state
} else {
    Swal.fire({
        title: 'Error',
        text: 'Hubo un error',
        icon: 'error'
    })
}

//**************************************************************************
// Update via socket

import { getSession } from '../helpers/getSession.js'
import { baseURL } from '../helpers/baseUrl.js'

const socket = io.connect( baseURL )
socket.on('connect', () => {

    socket.emit('start-session', { sessionId: getSession(), name: getName() })

    socket.on('set-session-acknowledgment', () => {

        socket.on('avalaible-update-ac', ( value ) => {
            console.log("AC", value)
            formAC.checked = value
        })

        socket.on('avalaible-update-persiana', ( value ) => {
            formPersiana.checked = value
        })

    })
});
