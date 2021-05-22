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
const login = require("../scripts/login.js")
const pages = require("../data/pages")
const actions = require("../data/actions")

//**************************************************************************

var instanceHttp

class HttpServer  extends http.Server {

    constructor( port = 8080 ) {
        super()
        
        this.port = port
        this.server = this.createServer()
        instanceHttp = this
    }

    static getInstance () {
        if ( !instanceHttp ) return new HttpServer() 
        return instanceHttp
    }

    createServer () {
        return http.createServer( (req, res) => {
            req.setEncoding('utf-8')
            this.route( req, res, req.url )
        })
    }

    route ( req, res, url ) {
        const publicDir  = 'public'
        const pagesDir   = `${ publicDir }/pages`   
        let name         = ''
        let showPage     = false

        switch( url ) {
            case '/':
            case pages.LOGIN:
                showPage = true
                name = `${ pagesDir }/index.html`
                break;
            case pages.RESUMEN:
            case pages.ACTUADORES:
            case pages.HISTORICO:
            case pages.NOT_FOUND:
                showPage = true
                name = `${ pagesDir }${ url }.html`
                break;
            case actions.TOGGLE_PERSIANA:
                actionPOST( req, res, togglePersiana )
                break;
            case actions.TOGGLE_AC:
                actionPOST( req, res, toggleAC )
                break;
            case actions.SUBMIT_MEDIDAS:
                actionPOST( req, res, submitMedidas )
                break;
            case actions.LOGIN: 
                login( req, res )
                break;
            case actions.GET_HISTORICO:
                actionGET( res, getHistorico )
                break;
            case actions.GET_RESUMEN:
                actionGET( res, getResumen )
                break;
            default: 
                showPage = true
                name = url.replace('/','')          
                break;
        }
        
        if ( showPage ) {
            this.sendFile( res, name )
        }
    }

    sendFile( res, name ) {

        fs.readFile( name, ( err, data ) => {
            const extension = name.split('.').pop()
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
                    'Location': pages.NOT_FOUND
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