//**************************************************************************
// Update via socket

import { getSession } from '../helpers/getSession.js'
import { baseURL } from '../helpers/baseUrl.js'
import { getName } from '../helpers/getName.js'


const formPersiana = document.getElementById('form-persiana')
const formAC       = document.getElementById('form-ac')

const socket = io.connect( baseURL )
socket.on('connect', () => {

    socket.emit('start-session', { sessionId: getSession(), name: getName() })

    socket.on('set-session-acknowledgment', () => {

        socket.on('avalaible-update-ac', ( data ) => {
            formAC.checked = data.state
        })

        socket.on('avalaible-update-persiana', ( data ) => {
            formPersiana.checked = data.state
        })

        socket.on('avalaible-update-sensores', ( data ) => {
            setSensores( data.temperature, data.luminosity )
        })

    })
})

socket.on('disconnect', () => {
    Swal.fire({
        title: 'Estás offline',
        text: 'Revisa tu conexión a internet',
        icon: 'info'
    })
})
