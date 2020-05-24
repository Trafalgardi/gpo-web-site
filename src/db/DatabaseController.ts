import mysql from "mysql"

export default class DatabaseController{
    private pool: mysql.Pool;
    public get Pool(): mysql.Pool{
        return this.pool;
    }
    private connection: mysql.PoolConnection;
    public format(sql: string, values: any[], stringifyObjects? : boolean, timeZone?: string){
        return this.connection.format(sql, values, stringifyObjects, timeZone)
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
                else if (err.code === 'ER_CON_COUNT_ERROR') {
                    console.error('Database has too many connections.')
                }
                else if (err.code === 'ECONNREFUSED') {
                    console.error('Database connection was refused.')
                }
                else if (err.code === 'ER_ACCESS_DENIED_ERROR'){
                    console.log("Database connection Access denied")
                }
                else{
                    console.log(err)
                }
                process.exit(0);
            }
            if (connection) {
                connection.release(); 
                this.connection = connection;
                console.log("Database release connection");
            }
            
        });
    }
}
