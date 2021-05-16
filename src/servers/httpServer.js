const http   = require("http")
const fs     = require("fs")

const togglePersiana = require("../scripts/actuadores/persiana")
const toggleAC       = require("../scripts/actuadores/ac")
const getMime        = require("../helpers/mimeTypes")
//**************************************************************************

class HttpServer {

    constructor( port = 8080 ) {
        this.port = port
        this.server = this.createServer()
    }

    createServer () {
        return http.createServer( (req, res) => {
            req.setEncoding('utf-8')
            this.route( req, res, req.url )
        })
    }

    route ( req, res, url ) {
        const publicDir  = 'public'
        const pagesDir   = `${publicDir}/pages`   
        let name         = ''
        let showPage     = true
        
        switch( url ) {
            case '/':
            case '/resumen':
                name = `${pagesDir}/index.html`
                break;
            case '/actuadores':
                name = `${pagesDir}/actuadores.html`
                break;
            case '/historico':
                name = `${pagesDir}/historico.html`
                break;
            case '/404':
                name = `${pagesDir}/404.html`
                break;
            case '/action/persiana':
                showPage = false
                
                req.on('data', data => req.body = JSON.parse( data ) )
                req.on('end', () => {
                    const message = togglePersiana( req.body.value ) 
                                        
                    res.writeHead( 200, {
                        "Content-Type": "text/plain"
                    })
                    res.write( message )
                    res.end()
                })
                break;
            case '/action/ac':
                showPage = false
                
                req.on('data', data => req.body = JSON.parse( data ) )
                req.on('end', () => {
                    const message =  toggleAC( req.body.value ) 

                    res.writeHead( 200, {
                        "Content-Type": "text/plain"
                    })
                    res.write( message )
                    res.end()
                })
                break;
            default: 
                name = url.replace('/','')
                break;
        }

        if ( showPage ) {
            this.showFile( res, name )
        }
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
                    "Content-Type": mimeType
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