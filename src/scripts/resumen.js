const { getAC } = require("./actuadores/ac")
const { getPersiana } = require("./actuadores/persiana")
const { getSensores } = require("./sensores/sensores")

const getResumen =  async () => {
    const sensores = await getSensores()
    const ac       = await getAC()
    const persiana = await getPersiana()

    return {
        sensores,
        ac,
        persiana
    }
}

//**************************************************************************

module.exports = {
    getResumen
}