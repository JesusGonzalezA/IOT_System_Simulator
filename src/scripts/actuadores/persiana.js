const DBServer = require("../../servers/dbServer")

const togglePersiana = async ( { value } ) => {
    const db = DBServer.getInstance()
    const date = new Date( Date.now() ).toISOString()

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