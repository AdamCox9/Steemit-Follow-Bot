const sql = require('mssql');
const util = require('util')

const config = {
    user: config.steem.steemsql_username,
    password: config.steem.steemsql_password,
    server: config.steem.steemsql_server,
    database: config.steem.steemsql_database,
}

sql.connect(config).then(pool => {
    return pool.request()
    .query("SELECT dbo.Reblogs.* FROM dbo.Reblogs WHERE permlink = '30-sbd-webgl-screen-capture-contest'")
}).then(result => {
	console.log(JSON.stringify(result, null, 4));
})

sql.on('error', err => {
})