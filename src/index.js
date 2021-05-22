const HttpServer = require("./servers/httpServer.js")
const ConsoleHelper = require("./helpers/console.js")
const DBServer = require("./servers/dbServer.js")
const SocketServer = require("./servers/socketServer.js")
const Agent = require("./services/Agent.js")
//**************************************************************************

// Initialize variables
const agent         = new Agent()
const consoleHelper = new ConsoleHelper()
const httpServer    = new HttpServer()
const dbServer      = new DBServer()
const socketServer  = new SocketServer( httpServer.server )

// Hello
consoleHelper.printGreetings()

// Initialize servers
httpServer.start()
dbServer.start()
socketServer.start()
