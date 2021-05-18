const DBServer = require("../../servers/dbServer")

const togglePersiana = async ( { value } ) => {
    const db = DBServer.getInstance()
    const date = new Date( Date.now() ).toISOString()

    return await db.insert('persiana', [ { state: value, date } ] )
}

//**************************************************************************

module.exports = togglePersiana