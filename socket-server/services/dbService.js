import mysql from 'mysql-await'

export default class DbService{
    constructor(){
        this.conn = this.createConnection()
    }

    createConnection(){
        return mysql.createConnection({
            "connectionLimit" : "10",
            "host": "localhost",
            "user": "gustavo",
            "password": "123456",
            "port": "3306",
            "database": "seccomp"
        })
    }

    async getSubscribers(){
        let { conn } = this
        let result = await conn.awaitQuery(`SELECT * FROM subscribers`) 
        return result
    }

    async insertSubscribers(subscribers){
        let { conn } = this
        this.prepareInsert(subscribers)
        //let result = await conn.awaitQuery(``)
    }

    prepareInsert(subscribers){
        let query = "INSERT INTO subscribers(Name, Phone) VALUES "
        subscribers.forEach(subscriber => {
            if(subscriber.Name !== undefined && subscriber.Phone !== undefined){
                query += `("${subscriber.Name}","${subscriber.Phone}"),`
            }
        });
        query = this.cautiousSemicolonInsertion(query)
        console.log(query)
        return query
    }

    cautiousSemicolonInsertion (query){
        query = Array.from(query)
        let lastCommaIndex = query.length-1
        query[lastCommaIndex] = ";"
        query = query.join("")
        return query
    }

}