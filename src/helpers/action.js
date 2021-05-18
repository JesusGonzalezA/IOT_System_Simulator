
const action =  ( req, res, callback ) => {
    req.on('data', data => req.body = JSON.parse( data ) )
    req.on('end', async () => {                    
        const message = await callback( req.body )
        const ok = ( message.result.ok === 1 )

        res.writeHead( ( ok ) ? 200 : 500, {
            "Content-Type": "text/plain"
        })
        res.write( 
            ( ok )
            ? 'La acción se realizó correctamente'
            : 'Hubo un error'
        )
        res.end()
    })
}

//**************************************************************************

module.exports = action 