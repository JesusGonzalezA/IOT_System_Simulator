const socketio = require('socket.io')

//**************************************************************************

class SocketServer extends socketio.Server {

    constructor ( httpServer ) {
        super()
        this.httpServer = httpServer
        this.instance = this
    }

    static getInstance () {
        if (!this.instance) this.instance = new DBServer()
        return this.instance
    }

    start () {
        this.listen( this.httpServer )
        console.log("Socketio is ready");

        this.sockets.on( 'connection' , ( socket ) => {
            
            
            socket.on( 'disconnect' , () => {

            })
        })
    }
}

//**************************************************************************
module.exports = SocketServer