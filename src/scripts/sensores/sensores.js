const socketEvents = require("../../helpers/socketEvents")
const DBServer = require("../../servers/dbServer")
const SocketServer = require("../../servers/socketServer")
const Agent = require("../../services/Agent")
const { getAC, toggleAC } = require("../actuadores/ac")
const { getPersiana, togglePersiana } = require("../actuadores/persiana")

const submitMedidas =  async ( { luminosity, temperature } ) => {
    const db = DBServer.getInstance()
    const date = new Date( Date.now() ).toISOString()

    // Socket
    SocketServer
        .getInstance()
        .emit( socketEvents.AVALAIBLE_UPDATE_SENSORES, { 
            luminosity, 
            temperature, 
            date 
        })
    
    // Agent
    let message = ''
    const lastAc = await getAC()
    const lastPersiana = await getPersiana()

    const agent = Agent.getInstance()
    const checkTemperature = agent.checkTemperature( temperature )
    const checkLuminosity  = agent.checkLuminosity( luminosity )

    if ( !checkTemperature.minOk ) {
        if ( lastAc.state ) {
            message += 'Temperatura bajo mínimos. Apago el aire.\n' 
            toggleAC( { value: false } )
        }
        if ( !lastPersiana.state ) {
            message += 'Temperatura bajo mínimos. Abro las persianas.\n'
            togglePersiana( { value: true } )
        }
    }
    else if ( !checkTemperature.maxOk ) {
        if ( !lastAc.state ) {
            message += 'Temperatura superior al máximo. Enciendo el aire.\n' 
            toggleAC( { value: true } )
        }
        if ( lastPersiana.state ) {
            message += 'Temperatura superior al máximo. Cierro las persianas.\n'
            togglePersiana( { value: false } )
        }
    }

    if ( !checkLuminosity.minOk && !lastPersiana.state ) {
        message += 'Luminosidad bajo mínimos. Abro las persianas.\n'
        togglePersiana( { value: true } )
    }
    else if ( !checkLuminosity.maxOk && lastPersiana.state) {
        message += 'Luminosidad superior al máximo. Cierro las persianas.\n'
        togglePersiana( { value: false } )
    }

    if ( message !== '' )
        SocketServer
            .getInstance()
            .emit( socketEvents.ALERT_MESSAGE, message )

    // Submit    
    return await db.insert('sensores', [ { luminosity, temperature, date } ] )
}

const getSensores = async () => {
    const db = DBServer.getInstance()

    return await db.getLastOne('sensores')
}

//**************************************************************************

module.exports = {
    submitMedidas,
    getSensores
}