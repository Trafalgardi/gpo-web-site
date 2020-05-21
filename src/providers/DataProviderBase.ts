import mysql from "mysql"
import util from 'util';
import DatabaseController from "../db/DatabaseController";
export default abstract class DataProviderBase{

    protected readonly query: any;
    
    constructor(protected dbController: DatabaseController){
        this.query = util.promisify(this.dbController.Pool.query).bind(this.dbController.Pool);
    }
} 