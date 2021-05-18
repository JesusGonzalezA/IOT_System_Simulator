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

        this.sockets.on( 'connection' , ( socket ) => {

            console.log(socket);
            
            socket.on( 'disconnect' , () => {

            })
        })
    }
}

//**************************************************************************
module.exports = SocketServer