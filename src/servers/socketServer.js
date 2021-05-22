const socketio = require('socket.io')
const { v4: uuidv4 } = require('uuid')
const socketEvents = require('../helpers/socketEvents')
const HttpServer = require('./httpServer')

//**************************************************************************

var instanceSocket

class SocketServer extends socketio.Server {

    constructor ( httpServer ) {
        super()
        this.httpServer = httpServer
        this.listen( this.httpServer )
        instanceSocket = this
    }

    static getInstance () {
        if (!instanceSocket) instanceSocket = new SocketServer( HttpServer.getInstance().server )

        return instanceSocket
    }

    emit ( event, data ) {
        this.sockets.emit( event, data )
    }

    start () {
        console.log("Socketio is ready");

        this.sockets.on( socketEvents.CONNECTION , ( socket ) => {   
            
            socket.on(socketEvents.START_SESSION, (data) => {

                const sessionId = ( !data.sessionId )
                    ? uuidv4() 
                    : data.sessionId
                
                socket.emit(socketEvents.SET_SESSION, {
                    sessionId
                })

            })

            socket.on( socketEvents.DISCONNECT , () => {
                
            })
        })
    }
}

//**************************************************************************
module.exports = SocketServer