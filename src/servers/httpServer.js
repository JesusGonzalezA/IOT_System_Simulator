const http   = require("http")
const fs     = require("fs")

const getMime        = require("../helpers/mimeTypes")
const submitMedidas  = require("../scripts/sensores/sensores.js").submitMedidas
const getHistorico   = require("../scripts/historico").getHistorico
const togglePersiana = require("../scripts/actuadores/persiana").togglePersiana
const toggleAC       = require("../scripts/actuadores/ac").toggleAC
const getResumen     = require("../scripts/resumen.js").getResumen
const { 
    actionPOST, 
    actionGET 
} = require("../helpers/actions")

//**************************************************************************

class HttpServer  extends http.Server {

    constructor( port = 8080 ) {
        super()
        
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
                name = `${pagesDir}/index.html`
                break;
            case '/resumen':
                name = `${pagesDir}/resumen.html`
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
                actionPOST( req, res, togglePersiana )
                break;
            case '/action/ac':
                showPage = false
                actionPOST( req, res, toggleAC )
                break;
            case '/action/submit-medidas':
                showPage = false 
                actionPOST( req, res, submitMedidas )
                break;
            case '/action/get-historico':
                showPage = false 
                actionGET( res, getHistorico )
                break;
            case '/action/get-resumen':
                showPage = false
                actionGET( res, getResumen )
                break;
            default: 
                name = url.replace('/','')
                                
                break;
        }
        
        if ( showPage ) {
            this.sendFile( res, name )
        }
    }

    sendFile( res, name ) {
         
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