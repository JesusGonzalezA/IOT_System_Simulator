const alertValues = require("../data/alertValues")

var instanceAgent 

class Agent {

    constructor() {
        instanceAgent = this
    }

    static getInstance () {
        if ( !instanceHttp ) return new HttpServer() 
        return instanceHttp
    }

    checkValue ( value, alertValues ) {
        return ( value < alertValues.max && value > alertValues.min )
    }
    checkTemperature ( value ) {
        return this.checkValue( value, alertValues.temperature )
    } 

    checkLuminosity ( value ) {
        return this.checkValue( value, alertValues.luminosity )
    }
}

//**************************************************************************

module.exports = Agent