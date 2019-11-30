var mysql = require('mysql')
var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'usrgpo',
    password: 'PhyGyisHNsboc2DU', //fkx8ZepaJEtS2xy //vMETuklX1HC4vX1g MySql auth  vMETuklX1HC4vX1g
    database: 'RecommendationSystem'
})
function conn() {
    

    pool.getConnection((err, connection) => {
        console.log("Database connected!");
        if (err) {
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                console.error('Database connection was closed.')
            }
            if (err.code === 'ER_CON_COUNT_ERROR') {
                console.error('Database has too many connections.')
            }
            if (err.code === 'ECONNREFUSED') {
                console.error('Database connection was refused.')
                

            }
        }
        if (connection) connection.release()
        return
    })

}
conn();
module.exports = pool
