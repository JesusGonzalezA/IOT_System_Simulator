const DBServer = require("../servers/dbServer")

const getHistorico =  async () => {
    
    const db = DBServer.getInstance()
    const sensores = await db.get('sensores')
    const ac       = await db.get('ac')
    const persiana = await db.get('persiana')
    return {
        sensores,
        ac,
        persiana
    }
}

//**************************************************************************

module.exports = {
    getHistorico
}