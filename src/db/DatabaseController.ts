import mysql from "mysql"

export default class DatabaseController{
    private pool: mysql.Pool;
    public get Pool(): mysql.Pool{
        return this.pool;
    }
    constructor(host: string, db: string, user: string, password: string){
        this.pool = mysql.createPool({
            connectionLimit: 10,
            host: host,
            user: user,
            password: password,
            database: db
        })
        this.conn();
    }

    private conn() {
        this.pool.getConnection((err: mysql.MysqlError, connection: mysql.PoolConnection) => {
            
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
            if (connection) connection.release(); 
        });
    }
}
