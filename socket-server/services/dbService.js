import mysql from 'mysql-await'
import ResponseService from './responseService'

export default class DbService{
    constructor(){
        this.conn = this.createConnection()
        this.response = new ResponseService()
    }

    cautiousSemicolonInsertion (query){
        query = Array.from(query)
        let lastCommaIndex = query.length-1
        query[lastCommaIndex] = ";"
        query = query.join("")
        return query
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

    async getAllSubscribers(){
        let { conn, response } = this
        try{
            let result = await conn.awaitQuery(`SELECT * FROM subscribers`) 
            result = JSON.stringify(result)

            if(result !== '[]')
                return response.successResponse("Aqui estão todos os inscritos na Seccomp de 2020!", result)
            else    
                return response.errorResponse("Não foram encontrados inscritos na Seccomp de 2020.")
        } catch (error) {
            return response.errorResponse(`Não foi possível realizar a busca. Segue mensagem de erro: ${error.message}`)
        }
        
    }

    async getMessageRecievers(){
        let { conn, response } = this
        try{
            let result = await conn.awaitQuery(`SELECT * FROM subscribers where MessageReciever = 1;`) 
            result = JSON.stringify(result)
            
            if(result !== '[]')
                return response.successResponse("Aqui estão todos os inscritos na Seccomp de 2020 que desejam receber mensagens!", result)
            else    
                return response.errorResponse("Não foram encontrados inscritos na Seccomp de 2020 que desejam receber mensagens.")
    
        } catch (error) {
            return response.errorResponse(`Não foi possível realizar a busca. Segue mensagem de erro: ${error.message}`)
        }
    }

    async getNoMessageRecievers(){
        let { conn, response } = this
        try{
            let result = await conn.awaitQuery(`SELECT * FROM subscribers where MessageReciever = 0;`) 
            result = JSON.stringify(result)
            
            if(result !== '[]')
                return response.successResponse("Aqui estão todos os inscritos na Seccomp de 2020 que não desejam receber mensagens!", result)
            else    
                return response.errorResponse("Não foram encontrados inscritos na Seccomp de 2020 que não desejam receber mensagens.")
    
        } catch (error) {
            return response.errorResponse(`Não foi possível realizar a busca. Segue mensagem de erro: ${error.message}`)
        }
    }

    async insertSubscribers(subscribers){
        let { conn, response } = this
        let mappedInsert = this.prepareInsert(subscribers)
        let query = mappedInsert.query
        let subscribersWithBadFormat = mappedInsert.errors
        if(query){
            try{
                let result = await conn.awaitQuery(query)
                console.log(`query result: ${result}`)
                
                if(subscribersWithBadFormat.length > 0)
                    return response.successResponse(`Alguns inscritos foram inseridos com sucesso. Porém, revise a formatação para os seguintes inscritos: ${JSON.stringify(subscribersWithBadFormat)}`, null)
                return response.successResponse("Novos inscritos inseridos com sucesso!", null)
            } catch(error){
                return response.errorResponse(`Não foi possível realizar a inserção. Segue mensagem de erro: ${error.message}`)
            }
        } else {
            return response.errorResponse("Os inscritos não foram inseridos pois é necessário revisar a formatação.")
        }

    }

    prepareInsert(subscribers){
        let query = "INSERT INTO subscribers(Name, Phone) VALUES "
        let values = ""
        let errors = []

        subscribers.forEach(subscriber => {
            if(subscriber.Name !== undefined && subscriber.Phone !== undefined){
                values += `("${subscriber.Name}","${subscriber.Phone}"),`
            } else{
                errors.push(subscriber)
            }
        });

        if(values.length > 0){
            values = this.cautiousSemicolonInsertion(values)
            query += values
            console.log(query)
            return {query, errors}
        } else {
            return {"query": null, errors}
        }
    }

    async getSubscriberByPhone(subscriberPhone){
        let { conn, response } = this

        try{
            let queryResult = await conn.awaitQuery(`SELECT * FROM subscribers WHERE Phone = ${subscriberPhone}`)
            queryResult = queryResult[0]

            if(queryResult.length > 0 || queryResult != '[]')
                return response.successResponse("Sucesso ao identificar inscrito por número de telefone!", queryResult)
            return response.errorResponse("Não foi encontrado algum inscrito com este número.")
        } catch (error){
            console.log(`Error in dbService.getSubscriberByPhone: ${error.message}`)
            return response.errorResponse("Erro ao identificar inscrito por número de telefone.")
        }

    }

    async setSubscriberAsNoMessageReciever(subscriberPhone){
        let { conn, response } = this
        
        let result = await this.getSubscriberByPhone(subscriberPhone)
        if(result.success){
            let subscriberID = result.data.ID
            console.log(subscriberID)
            try{
                await conn.awaitQuery(`UPDATE subscribers SET MessageReciever = 0 WHERE ID = ${subscriberID}`)
                return response.successResponse("Inscrito definido como não recebedor de mensagem!")
            }catch(error){
                console.log(`Error in dbService.setSubscriberAsNoMessageReciever: ${error.message}`)
                return response.errorResponse("Não foi possível definir inscrito como não recebedor de mensagens.")
            }
        }
        return result
    }

    async setSubscriberAsMessageReciever(subscriberPhone){
        let { conn, response } = this
        
        let result = await this.getSubscriberByPhone(subscriberPhone)
        if(result.success){
            let subscriberID = result.data.ID
            console.log(subscriberID)
            try{
                await conn.awaitQuery(`UPDATE subscribers SET MessageReciever = 1 WHERE ID = ${subscriberID}`)
                return response.successResponse("Inscrito definido como recebedor de mensagem!")
            }catch(error){
                console.log(`Error in dbService.setSubscriberAsMessageReciever: ${error.message}`)
                return response.errorResponse("Não foi possível definir inscrito como recebedor de mensagens.")
            }
        }
        return result
    }

}