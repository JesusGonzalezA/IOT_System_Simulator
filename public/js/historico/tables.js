
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

const updateTableActuador = ( entry, template, tbody, active, unactive ) => {
    const node = template.cloneNode( true )
    const columns = Array.from( node.children[0].children )
    
    const date = new Date( entry.date )
    columns[0].innerText = date.toLocaleDateString() + ", " + date.toLocaleTimeString()
    columns[1].innerText = ( entry.state )? active : unactive
    tbody.insertBefore( node, tbody.childNodes[0] )
}

export const fillTablePersiana = ( values ) => {
    fillTableActuador( values, templatePersiana, tBodyPersiana, 'Subidas', 'Bajadas' )
}

export const fillTableAC = ( values ) => {
    fillTableActuador( values, templateAC, tBodyAC, 'Encendido', 'Apagado' )
}

export const updateTablePersiana = ( entry ) => {
    updateTableActuador( entry, templatePersiana, tBodyPersiana, 'Subidas', 'Bajadas' )
}

export const updateTableAC = ( entry ) => {
    updateTableActuador( entry, templateAC, tBodyAC, 'Encendido', 'Apagado' )
}

export const fillTableSensores = ( values ) => {
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

export const updateTableSensores = ( values ) => {
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