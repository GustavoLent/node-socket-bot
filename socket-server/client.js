var socket = require('socket.io-client')('http://localhost:3000');
const repl = require('repl')
const chalk = require('chalk');

socket.on('disconnect', function() {
    socket.emit('disconnect')
});

socket.on('connect', () => {
    console.log(chalk.green('=== start chatting ==='))
})

socket.on('message', (data) => {
    console.log('data'+data)
    //const { cmd, username } = data
    //console.log(chalk.green(username + ': ' + cmd.split('\n')[0]));
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