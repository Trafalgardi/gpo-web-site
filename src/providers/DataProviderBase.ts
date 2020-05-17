import mysql from "mysql"
import util from 'util';
export default abstract class DataProviderBase{

    protected readonly query: any;
    
    constructor(protected dbConnection: mysql.Pool){
        this.query = util.promisify(this.dbConnection.query).bind(this.dbConnection);
    }
} 