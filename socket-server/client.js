var socket = require('socket.io-client')('http://localhost:3000');
const repl = require('repl')
const chalk = require('chalk');

socket.on('disconnect', function() {
    socket.emit('disconnect')
});

socket.on('connect', () => {
    console.log(chalk.yellow('=== Conectado com o socket da Seccomp! ==='))
    
    console.log("\n" + chalk.cyan(`Bem vindo, segue a lista de comandos disponíveis:`))
    
    console.log("\n" + chalk.cyan(`{"action":"insertSubscribers","subscribers":"[{\"Name\":\"Gustavo\", \"Phone\":\"00000000\"}, {\"Name\":\"José\", \"Phone\":\"00000000\"}]"}`))
    console.log(chalk.red(`Observação:`) + chalk.white(`Este comando possui um array de objetos, separados por vírgula.\nPor isso, é importante usar o escape (\"\") para delimitar as informações Name e Phone, que devem ser escritas exatamente assim!`))
    
    console.log("\n" + chalk.cyan(`{"action":"sendMessageWithLink","text":"Este evento já vai começar, não perca!!!","link":"https://www.youtube.com/watch?v=qxBMyq_TbGA&list=PLR6hBJiWw_k-LufkmrZgT5sMNTLfodKxK&index=2"}`))
    console.log("\n" + chalk.cyan(`{"action":"getAllSubscribers"}`))
    console.log("\n" + chalk.cyan(`{"action":"GetMessageRecievers"}`))
    console.log("\n" + chalk.cyan(`{"action":"GetNoMessageRecievers"}`))
    console.log("\n" + chalk.cyan(`{"action":"setSubscriberAsNoMessageReciever","phone":"00000000"}`))
    console.log("\n" + chalk.cyan(`{"action":"setSubscriberAsMessageReciever","phone":"0000000"}`))

    console.log(chalk.yellow('\nBasta digitar o comando!\n'))

})

socket.on('message', (incomming) => {
    if(incomming.success){
        console.log(chalk.green("\nMensagem do servidor: ") + incomming.message)
        if(incomming.data)
            console.log(chalk.blue("Data do servidor: ") + JSON.stringify(incomming.data))
    } else {
        console.log(chalk.red("\nMensagem do servidor: ") + incomming.message)
        if(incomming.data)
            console.log(chalk.grey("Data do servidor: ") + JSON.stringify(incomming.data))
    }

    console.log('')

})

repl.start({
    prompt: '',
    eval: (input) => {     
        let commandToSend = removeNewLine(input)
        socket.send(commandToSend)
    }
})

function removeNewLine(data){
    data = Array.from(data)
    let newLineIndex = data.length-1
    data = data.slice(0, newLineIndex)
    data = data.join("")
    return data
}