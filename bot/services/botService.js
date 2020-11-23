const venom = require('venom-bot')
import DialogService from "./dialogService"

export default class BotService{
    async init(){
        this.client = await venom.create({ useChrome: false, browserArgs: ['--no-sandbox'] });
        this.dialogService = new DialogService()
        this.keepListening()
    }

    async keepListening() {
        let { client, dialogService } = this
        
        client.onMessage(async (message) => {
            let subscriberPhone = message.from
            subscriberPhone = subscriberPhone.replace('@c.us', '')

            let dialogResponse = dialogService.handleDialog(message.content, subscriberPhone)

            client.sendText(message.from, dialogResponse)
        })

        console.log("Bot is listening!");
    }

    async sendSimpleMessage(reciever, text){
        let { client } = this
        try{
            await client.sendText(reciever + '@c.us', text)
            return
        } catch(error){
            console.log(error)
        }
    }
    
    async sendMessageWithLink(reciever, text, link){
        let { client } = this
        try{
            await client.sendLinkPreview(
                reciever + '@c.us', 
                link,
                text
                )
            return
        } catch(error){
            console.log(error)
        }
    }

}