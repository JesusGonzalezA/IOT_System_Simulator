const socketEvents = require("../../helpers/socketEvents")
const DBServer = require("../../servers/dbServer")
const SocketServer = require("../../servers/socketServer")

const submitMedidas =  async ( { luminosity, temperature } ) => {
    const db = DBServer.getInstance()
    const date = new Date( Date.now() ).toISOString()

    SocketServer
        .getInstance()
        .emit( socketEvents.AVALAIBLE_UPDATE_SENSORES, { 
            luminosity, 
            temperature, 
            date 
        })

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