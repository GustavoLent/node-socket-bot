import DbService from './dbService'
import ResponseService from './responseService'

export default class BotService{
    constructor(){
        this.db = new DbService()
        this.response = new ResponseService()
    }

    async sendSimpleMessage(text){
        let { db, response } = this
        let messageRecieversResponse = await db.getMessageRecievers()
        let messageRecievers

        if(messageRecieversResponse.success){
            messageRecievers = messageRecieversResponse.data
            return {
                data: {
                    recievers: messageRecievers, 
                    text,
                    linkPreview: null
                },
                spread: true,
                commandCallback: response.successResponse("Mensagem trasmitida ao bot!", null)
            }
        }
        return response.errorResponse(messageRecieversResponse.message)
    }

    async sendMessageWithLink(text, link){
        let { db, response } = this
        let messageRecieversResponse = await db.getMessageRecievers()
        let messageRecievers

        if(messageRecieversResponse.success){
            messageRecievers = messageRecieversResponse.data
            return {
                data: {
                    recievers: messageRecievers, 
                    text,
                    linkPreview: link
                },
                spread: true,
                commandCallback: response.successResponse("Mensagem com preview de link trasmitida ao bot!", null)
            }
        }
        return response.errorResponse(messageRecieversResponse.message)
    }
}