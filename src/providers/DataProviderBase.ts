import mysql from "mysql"
import DatabaseController from "../db/database";
export default abstract class DataProviderBase{
    //protected dbConnection: mysql.Pool;
    constructor(protected dbConnection: mysql.Pool){
       
    }
} 