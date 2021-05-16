const HttpServer = require("./servers/httpServer.js")
const ConsoleHelper = require("./helpers/console.js")


const consoleHelper = new ConsoleHelper()
const httpServer = new HttpServer()

consoleHelper.printGreetings()
httpServer.start()