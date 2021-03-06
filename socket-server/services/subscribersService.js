import DbService from './dbService'
import ResponseService from './responseService'


export default class SubscribersService{
    constructor(){
        this.db = new DbService()
        this.response = new ResponseService()
    }

    async getAllSubscribers(){
        let { db } = this
        return await db.getAllSubscribers()
    }
    
    async getMessageRecievers(){
        let { db } = this
        return await db.getMessageRecievers()
    }
    
    async getNoMessageRecievers(){
        let { db } = this
        return await db.getNoMessageRecievers()
    }
    
    async insertSubscribers(message){
        let { db, response } = this
        let subscribers = this.identifySubscribers(message)
        
        if(subscribers)
            return await db.insertSubscribers(subscribers)
        else
            return response.errorResponse("Por favor, verifique a formatação na qual foram inseridos os novos inscritos.")
    }

    identifySubscribers(message){
        try{
            let subscribers = JSON.parse(message.subscribers)
            return subscribers
        } catch(error){
            return null
        }
    }

    async setSubscriberAsNoMessageReciever(userPhone){
        let { db } = this
        return await db.setSubscriberAsNoMessageReciever(userPhone)
    }

    async setSubscriberAsMessageReciever(userPhone){
        let { db } = this
        return await db.setSubscriberAsMessageReciever(userPhone)
    }

}