const socketEvents = require("../../helpers/socketEvents")
const DBServer = require("../../servers/dbServer")
const SocketServer = require("../../servers/socketServer")

const togglePersiana = async ( { value } ) => {
    const db = DBServer.getInstance()
    const date = new Date( Date.now() ).toISOString()

    SocketServer
        .getInstance()
        .emit( socketEvents.AVALAIBLE_UPDATE_PERSIANA, value )

    return await db.insert('persiana', [ { state: value, date } ] )
}

const getPersiana = async () => {
    const db = DBServer.getInstance()

    return await db.getLastOne('persiana')
}

//**************************************************************************

module.exports = {
    togglePersiana,
    getPersiana
}