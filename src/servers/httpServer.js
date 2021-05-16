const http   = require("http")
const fs     = require("fs")
const getMime = require("../helpers/mimeTypes")
//**************************************************************************

class HttpServer {

    constructor( port = 8080 ) {
        this.port = port
        this.server = this.createServer()
    }

    createServer () {
        return http.createServer( (req, res) => {
            const file = this.route( req.url )
            this.showFile( res, file )           
        })
    }

    route ( url ) {
        let name = ''

        switch( url ) {
            case '/':
            case '/resumen':
                name = 'pages/index.html'
                break;
            case '/actuadores':
                name = 'pages/actuadores.html'
                break;
            case '/historico':
                name = 'pages/historico.html'
                break;
            case '/404':
                name = 'pages/404.html'
                break;
            default:
                name = `assets/${url}` 
                break;
        }

        return `public/${name}`
    }

    showFile( res, name ) {
         
        fs.readFile( name, ( err, data ) => {
            const extension = name.split('.')[1]
            const mimeType  = getMime( extension )
            
            const content = {
                code: 500,
                type: "",
                data: ""
            }
            
            if ( !err ) {
                content.code = 200
                content.type = mimeType
                content.data = data

                res.writeHead( content.code, {
                    "Content-Type": "text/html"
                })
                res.write( content.data )
            } else {
                res.writeHead( 301, {
                    'Location': '/404'
                })
            }
            
            res.end()
        })
    }

    start () {
        this.server.listen( this.port )
        
        if ( this.server.listening ) {
            console.log('Server is ready: ', `http://localhost:${ this.port }`.green)
        }
        else {
            throw new Error(`Server is not listening on port ${ this.port }`)
        }
    }
}

//**************************************************************************

module.exports = HttpServer