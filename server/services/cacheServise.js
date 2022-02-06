const NodeCache = require( "node-cache" )

module.exports = new NodeCache( { stdTTL: 300, checkperiod: 400 } );
