const DBServer = require("../../servers/dbServer")

const toggleAC = async ( { value } ) => {

    const db = DBServer.getInstance()
    const date = new Date( Date.now() ).toISOString()

    return await db.insert('ac', [ { state: value, date } ] )
}

//**************************************************************************

module.exports = toggleAC