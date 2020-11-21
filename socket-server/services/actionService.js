import DbService from './dbService'
const dbService = new DbService()

export default class ActionService{
    async indetifyAction(message){
        let parsedMessage = JSON.parse(message)
        let action = parsedMessage.action
        console.log(`${action}`)
        switch(action){
            case "insertSubscribers":
                let subscribers = this.identifySubscribers(parsedMessage)
                if(subscribers)
                await dbService.insertSubscribers(subscribers)  
        }
    }

    identifySubscribers(message){
        try{
            let subscribers = JSON.parse(message.subscribers)
            return subscribers
        } catch(error){
            return null
        }
    }

}