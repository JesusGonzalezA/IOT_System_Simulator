const MongoClient = require('mongodb').MongoClient
const assert      = require('assert')
//**************************************************************************

const DBConnection = {
    db: null
}

class DBServer {

    constructor ( url = "mongodb://localhost:27017", dbName = "iot" ) {
        this.dbName   = dbName
        this.url      = url
        this.instance = this
    }

    static getInstance () {
        if (!this.instance) this.instance = new DBServer()

        return this.instance
    }

    operate ( operation ) {
        new MongoClient( url, {
            useUnifiedTopology: true, 
            useNewUrlParser: true
        }).connect( (err) => {
            assert.strictEqual( null, err )
            
            const db = this.client.db( this.dbName )
            operation( db )
        })
    }

    getDB () {
        return DBConnection.db
    }

    async insert ( collectionName, values ) {
        return await this.getDB().collection(collectionName).insertMany(values)    
    }

    start () {
        

        MongoClient.connect(this.url, { 
            useNewUrlParser: true,
            useUnifiedTopology: true 
        })
        .then( ( connection ) => {
            DBConnection.db = connection.db(this.dbName)   
            console.log("MongoClient is ready")
        })
        .catch( ( err ) => {
            console.log("MongoClient failed", err )
        })
    
        
    }
}

//**************************************************************************

module.exports = DBServer