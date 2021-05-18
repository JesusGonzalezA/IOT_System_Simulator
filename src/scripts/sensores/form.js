const DBServer = require("../../servers/dbServer")

const submitMedidas =  async ( { luminosity, temperature } ) => {
    
    const db = DBServer.getInstance()
    const date = new Date( Date.now() ).toISOString()

    return await db.insert('sensores', [ { luminosity, temperature, date } ] )
}

//**************************************************************************

module.exports = submitMedidas