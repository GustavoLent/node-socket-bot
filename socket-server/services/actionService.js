import BotService from './botService'
import ResponseService from './responseService'
import SubscribersService from './subscribersService'

const botService = new BotService()
const responseService = new ResponseService()
const subscribersService = new SubscribersService()

export default class ActionService{
    async indetifyAction(message){
        let parsedMessage = JSON.parse(message)
        let action = parsedMessage.action.toUpperCase()

        switch(action){
            case "GETALLSUBSCRIBERS": 
                return await subscribersService.getAllSubscribers()
            
            case "GETMESSAGERECIEVERS": 
                return await subscribersService.getMessageRecievers()
            
            case "GETNOMESSAGERECIEVERS": 
                return await subscribersService.getNoMessageRecievers()
            
            case "INSERTSUBSCRIBERS": 
                return await subscribersService.insertSubscribers(parsedMessage)                
            
            case "SENDSIMPLEMESSAGE": 
                return await botService.sendSimpleMessage(parsedMessage.text)
            
            case "SENDMESSAGEWITHLINK": 
                return await botService.sendMessageWithLink(parsedMessage.text, parsedMessage.link)
            
            case "SETSUBSCRIBERASNOMESSAGERECIEVER": 
                return await subscribersService.setSubscriberAsNoMessageReciever(parsedMessage.phone)
                
            case "SETSUBSCRIBERASMESSAGERECIEVER": 
                return await subscribersService.setSubscriberAsMessageReciever(parsedMessage.phone)
            
            default:
                return responseService.errorResponse("Comando inválido.")
        }
    }
}