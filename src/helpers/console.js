require("colors")

//**************************************************************************

class ConsoleHelper {

    constructor() {}

    printGreetings() {
        
        console.log(  
            ' _________________________________________ \n'.magenta
          + '|                                         |\n'.magenta
          + '|  Welcome to your IOT Simulation System  |\n'.magenta
          + '|_________________________________________|\n'.magenta
        )
    
    }

    printDivider () {

        console.log(
            '----------------------------------------------\n'
        )
        
    }
    
}

//**************************************************************************

module.exports = ConsoleHelper