import mysql from "mysql"
export default abstract class DataProviderBase{
    //protected dbConnection: mysql.Pool;
    constructor(protected dbConnection: mysql.Pool){
       
    }
} 