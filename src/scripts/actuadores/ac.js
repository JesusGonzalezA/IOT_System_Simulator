const socketEvents = require("../../helpers/socketEvents")
const DBServer = require("../../servers/dbServer")
const SocketServer = require("../../servers/socketServer")

const toggleAC = async ( { value } ) => {

    const db = DBServer.getInstance()
    const date = new Date( Date.now() ).toISOString()

    SocketServer
        .getInstance()
        .emit( socketEvents.AVALAIBLE_UPDATE_AC, value )

    return await db.insert('ac', [ { state: value, date } ] )
}

const getAC = async () => {
    const db = DBServer.getInstance()
    
    return await db.getLastOne('ac')
}

//**************************************************************************

module.exports = {
    toggleAC,
    getAC
}