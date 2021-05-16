
const togglePersiana = ( value ) => {
    let message = ( value ) ? 'Subidas' : 'Bajadas'
    message += ' correctamente'

    return message
}

//**************************************************************************

module.exports = togglePersiana