const sql = require('mssql');
const util = require('util')


const config = {
    user: 'Steemit-money-dreamer',
    password: 'Gmt3tkmY5FBw64Htw9GH',
    server: 'vip.steemsql.com',
    database: 'DBSteem',
}

sql.connect(config).then(pool => {
    return pool.request()
    .query("SELECT dbo.Reblogs.* FROM dbo.Reblogs WHERE permlink = '30-sbd-webgl-screen-capture-contest'")
}).then(result => {
	console.log(JSON.stringify(result, null, 4));
})

sql.on('error', err => {
})