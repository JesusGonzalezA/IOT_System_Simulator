const pages = require("../data/pages")
const getMime = require("./mimeTypes")

const actionPOST =  ( req, res, callback ) => {
    req.on('data', data => req.body = JSON.parse( data ) )
    req.on('end', async () => {                    
        const message = await callback( req.body )
        const ok = ( message.result.ok === 1 )

        res.writeHead( ( ok ) ? 200 : 500, {
            "Content-Type": getMime('text')
        })
        res.write( 
            ( ok )
            ? 'La acción se realizó correctamente'
            : 'Hubo un error'
        )
        res.end()
    })
}

const actionGET =  ( res, callback ) => {
    callback()
        .then( ( data ) => {
            res.writeHead( 200, {
                "Content-Type": getMime('text')
            })
            res.end(JSON.stringify(data))
        })
        .catch( (err) => {
            console.log(err);
            
            res.writeHead( 500, {
                "Content-Type": getMime('text')
            })
            res.write('Hubo un error')
            res.end()
        })
}

//**************************************************************************

module.exports = { actionPOST, actionGET }