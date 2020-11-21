import ResponseService from './responseService'
import SubscribersService from './subscribersService'

const responseService = new ResponseService()
const subscribersService = new SubscribersService()

export default class ActionService{
    async indetifyAction(message){
        let parsedMessage = JSON.parse(message)
        let action = parsedMessage.action.toUpperCase()
        
        switch(action){
            case "INSERTSUBSCRIBERS": {
                return await subscribersService.insertSubscribers(parsedMessage)                
            }

            case "GETALLSUBSCRIBERS": {
                return await subscribersService.getAllSubscribers()
            }

            case "GETMESSAGERECIEVERS": {
                return await subscribersService.getMessageRecievers()
            }

            case "GETNOMESSAGERECIEVERS": {
                return await subscribersService.getNoMessageRecievers()
            }

            default:
                return responseService.errorResponse("Comando inválido.")
        }
    }

}