
const tBodySensores    = document.getElementById('tbodySensores')
const tBodyAC          = document.getElementById('tbodyAC')
const tBodyPersiana    = document.getElementById('tbodyPersiana')
const templateSensor   = document.getElementById('sensorEntry').content
const templatePersiana = document.getElementById('persianaEntry').content
const templateAC       = document.getElementById('acEntry').content
const name             = document.getElementById('name')

name.innerText = 'Casa de ' + getName()

const fillTableActuador = ( values, template, tbody, active, unactive ) => {
    values.forEach( entry => {
        const node = template.cloneNode( true )
        const columns = Array.from( node.children[0].children )

        const date = new Date( entry.date )
        columns[0].innerText = date.toLocaleDateString() + ", " + date.toLocaleTimeString()
        columns[1].innerText = ( entry.state )? active : unactive
        tbody.appendChild( node )
    })
}

const updateTableActuador = ( entry, template, tbody, active, unactive ) => {
    const node = template.cloneNode( true )
    const columns = Array.from( node.children[0].children )

    const date = new Date( entry.date )
    columns[0].innerText = date.toLocaleDateString() + ", " + date.toLocaleTimeString()
    columns[1].innerText = ( entry.state )? active : unactive
    tbody.insertBefore( node, tbody.childNodes[0] )
}

const fillTablePersiana = ( values ) => {
    fillTableActuador( values, templatePersiana, tBodyPersiana, 'Subidas', 'Bajadas' )
}

const fillTableAC = ( values ) => {
    fillTableActuador( values, templateAC, tBodyAC, 'Encendido', 'Apagado' )
}

const updateTablePersiana = ( entry ) => {
    updateTableActuador( entry, templatePersiana, tBodyPersiana, 'Subidas', 'Bajadas' )
}

const updateTableAC = ( entry ) => {
    updateTableActuador( entry, templateAC, tBodyAC, 'Encendido', 'Apagado' )
}

const fillTableSensores = ( values ) => {
    values.forEach( entry => {
        const node = templateSensor.cloneNode( true )
        const columns = Array.from( node.children[0].children )
        
        const date = new Date( entry.date )
        columns[0].innerText = date.toLocaleDateString() + ", " + date.toLocaleTimeString()
        columns[1].innerText = 'Luminosidad \n Temperatura'
        columns[2].innerText = `${ entry.luminosity } \n ${ entry.temperature }º`
        tBodySensores.appendChild( node )   
    })
}

import { getName } from '../helpers/getName.js'
//--------------------------------------------------------------------------
import { sendGet } from '../helpers/sendGet.js'

const response = await sendGet( 'action/get-historico' )

if ( response.status !== 200) {
    Swal.file({
        title: 'Error',
        text: 'Hubo un error',
        icon: 'error'
    })
} else {
    const { sensores, ac, persiana } = await response.json()

    fillTableAC( ac )
    fillTablePersiana( persiana )
    fillTableSensores( sensores )
}
//--------------------------------------------------------------------------

//**************************************************************************
// Update via socket

import { getSession } from '../helpers/getSession.js'
import { baseURL } from '../helpers/baseUrl.js'

const socket = io.connect( baseURL )
socket.on('connect', () => {

    socket.emit('start-session', { sessionId: getSession(), name: getName() })

    socket.on('set-session-acknowledgment', () => {

        socket.on('avalaible-update-ac', ( data ) => {
            updateTableAC( data )
        })

        socket.on('avalaible-update-persiana', ( data ) => {
            updateTablePersiana( data )
        })

    })
});


