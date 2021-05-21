
//**************************************************************************

const getMime = require("../helpers/mimeTypes")

const login = ( req, res ) => {
    req.on('data', data => req.body = JSON.parse( data ) )
    req.on('end', () => { 

        if ( req.body !== '' ) {

            res.writeHead( 200, {
                "Content-Type": getMime('text')
            })
            res.write( 'La acción se realizó correctamente' )
            res.end()
            
        } else {

            res.writeHead( 500, {
                "Content-Type": getMime('text')
            })
            res.write( 'No se ha introducido un nombre de usuario' )
            res.end()

        }


    })
        
}

//**************************************************************************

module.exports = login