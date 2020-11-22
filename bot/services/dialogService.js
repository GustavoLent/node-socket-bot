import SocketService from "./socketService"

export default class DialogService{
    constructor(){
        this.socketService = new SocketService()
    }

    handleDialog(message, phone){
        let { socketService } = this

        let upperCasedMessage = message.toUpperCase()

        switch(upperCasedMessage){
            case "NÃO DESEJO RECEBER MAIS MENSAGENS":
                socketService.sendAction(`{"action":"setSubscriberAsNoMessageReciever","phone":"${phone}"}`)
                return `Tudo bem, você não irá receber mais mensagens! Caso deseje voltar a recebê-las, basta me pedir "Desejo voltar a receber mensagens".`
        
            case "DESEJO VOLTAR A RECEBER MENSAGENS":
                socketService.sendAction(`{"action":"setSubscriberAsMessageReciever","phone":"${phone}"}`)
                return `Você receberá mensagens sobre a Seccomp! Caso deseje parar de recebê-las, basta me pedir "Não desejo receber mais mensagens"` 
                
            case "LISTA DE COMANDOS":
                return `Aqui estão todos os comandos que eu entendo:\n"Não desejo receber mais mensagens"\n"Desejo voltar a receber mensagens"`
            
            default:
                return `Hummm... não entendi o que você disse!\nCaso queira ver a lista de comandos, me escreva "Lista de comandos" e atente-se a escrever exatamente igual ao comando desejado!`
        }
    }

}
