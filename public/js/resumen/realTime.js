//--------------------------------------------------------------------------
import { getSession } from '../helpers/getSession.js'
import { baseURL } from '../helpers/baseUrl.js'
import { getName } from '../helpers/getName.js'
import {
    setAC,
    setSensores,
    setPersiana
} from './getResumen.js'

const socket = io.connect( baseURL )
socket.on('connect', () => {

    socket.emit('start-session', { sessionId: getSession(), name: getName() })

    socket.on('set-session-acknowledgment', () => {

        socket.on('avalaible-update-ac', ( data ) => {
            setAC( data.state )
        })

        socket.on('avalaible-update-persiana', ( data ) => {
            setPersiana( data.state )
        })

        socket.on('avalaible-update-sensores', ( data ) => {
            setSensores( data )
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