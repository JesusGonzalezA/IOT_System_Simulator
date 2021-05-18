
const tBodySensores    = document.getElementById('tbodySensores')
const tBodyActuadores  = document.getElementById('tbodyActuadores')
const templateSensor   = document.getElementById('sensorEntry').content
const templateActuador = document.getElementById('actuadorEntry').content

const fillTableActuadores = ( values, title ) => {
    values.forEach( entry => {
        const node = templateActuador.cloneNode( true )
        const columns = Array.from( node.children[0].children )
        columns[0].innerText = entry.date
        columns[1].innerText = title
        columns[2].innerText = ( entry.state )? 'On' : 'Off'
        tBodyActuadores.appendChild( node )
    })
}

const fillTableSensores = ( values ) => {
    values.forEach( entry => {
        const node = templateSensor.cloneNode( true )
        const columns = Array.from( node.children[0].children )
        columns[0].innerText = entry.date
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

    
    fillTableActuadores( ac, "Aire acondicionado" )
    fillTableActuadores( persiana, "Persiana")
    fillTableSensores( sensores )
}


