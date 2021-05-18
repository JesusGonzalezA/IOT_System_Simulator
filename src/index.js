const HttpServer = require("./servers/httpServer.js")
const ConsoleHelper = require("./helpers/console.js")
const DBServer = require("./servers/dbServer.js")
const SocketServer = require("./servers/socketServer.js")
//**************************************************************************

// Initialize variables
const consoleHelper = new ConsoleHelper()
const httpServer = new HttpServer()
const socketServer = new SocketServer( httpServer )
const dbServer   = new DBServer()

// Hello
consoleHelper.printGreetings()

// Initialize servers
httpServer.start()
dbServer.start()
socketServer.start()
