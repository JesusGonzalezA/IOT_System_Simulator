
const tBodySensores    = document.getElementById('tbodySensores')
const tBodyAC          = document.getElementById('tbodyAC')
const tBodyPersiana    = document.getElementById('tbodyPersiana')
const templateSensor   = document.getElementById('sensorEntry').content
const templatePersiana = document.getElementById('persianaEntry').content
const templateAC       = document.getElementById('acEntry').content

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

const fillTablePersiana = ( values ) => {
    fillTableActuador( values, templatePersiana, tBodyPersiana, 'Subidas', 'Bajadas' )
}

const fillTableAC = ( values ) => {
    fillTableActuador( values, templateAC, tBodyAC, 'Encendido', 'Apagado' )
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



