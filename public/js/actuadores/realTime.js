//**************************************************************************
// Update via socket

import { getSession } from '../helpers/getSession.js'
import { baseURL } from '../helpers/baseUrl.js'
import { getName } from '../helpers/getName.js'
import { setSensores } from './defaultValues.js'


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
        
        socket.on('agent-alert', ( data ) => {
            Swal.fire({
                title: 'Alerta del agente',
                text: data,
                icon: 'info'
            })
        })

    })
})

socket.on('disconnect', () => {
    Swal.fire({
        title: 'Estás offline',
        text: 'Revisa tu conexión a internet',
        icon: 'warning'
    })
})
