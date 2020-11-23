const io = require('socket.io-client');

export default class socketService{
    constructor(bot = null){
        this.bot = bot
        this.socket = io.connect('13.68.156.180:3000')
    }

    keepListening(){
        let { socket, bot } = this

        socket.on('sendSimpleMessage', async (body) => {
            console.log(body)
            let recievers = JSON.parse(body.recievers)
            let text = body.text
    
            for (let i = 0; i < recievers.length; i++) {
                let reciever = recievers[i]
                await bot.sendMessageWithLink(reciever.Phone, text)
            }
        })
        
        socket.on('sendMessageWithLink', async (body) => {
            console.log(body)
            let recievers = JSON.parse(body.recievers)
            let text = body.text
            let link = body.linkPreview
    
            for (let i = 0; i < recievers.length; i++) {
                let reciever = recievers[i]
                await bot.sendMessageWithLink(reciever.Phone, text, link)
            }
        })
    }

    sendAction(commandToSend){
        let { socket } = this
        socket.send(commandToSend)
    }

}