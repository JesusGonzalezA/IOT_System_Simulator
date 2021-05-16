
const action = ( req, res, callback ) => {
    req.on('data', data => req.body = JSON.parse( data ) )
    req.on('end', () => {                    
        const message =  callback( req.body ) 

        res.writeHead( 200, {
            "Content-Type": "text/plain"
        })
        res.write( message )
        res.end()
    })
}

//**************************************************************************

module.exports = action 