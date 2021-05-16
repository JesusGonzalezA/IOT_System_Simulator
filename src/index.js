const HttpServer = require("./servers/httpServer.js")
const ConsoleHelper = require("./helpers/console.js")
//**************************************************************************

// Initialize variables
const consoleHelper = new ConsoleHelper()
const httpServer = new HttpServer()

// Hello
consoleHelper.printGreetings()

// Initialize servers
httpServer.start()