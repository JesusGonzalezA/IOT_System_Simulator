const DBServer = require("../../servers/dbServer")

const toggleAC = async ( { value } ) => {

    const db = DBServer.getInstance()
    const date = new Date( Date.now() ).toISOString()

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