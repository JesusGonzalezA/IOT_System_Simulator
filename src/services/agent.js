const alertValues = require("../data/alertValues")

var instanceAgent 

class Agent {

    constructor() {
        instanceAgent = this
    }

    static getInstance () {
        if ( !instanceAgent ) return new Agent() 
        return instanceAgent
    }

    checkValue ( value, alertValues ) {
        return {
            minOk:   ( value > alertValues.min ),
            maxOk:   ( value < alertValues.max )
        }
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