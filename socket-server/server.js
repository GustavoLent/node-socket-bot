const http = require('http').createServer();
const io = require('socket.io')(http);
import ActionService from './services/actionService'

const actionService = new ActionService()
const port = 3000

http.listen(port, () => console.log(`socket server listening on port: ${port}`))

io.on('connection', async (socket) => {
    console.log('new user connected')

    socket.on('message', async (data) => {
        let response = await actionService.indetifyAction(data)

        if(response.spread && response.data.linkPreview === null){
            socket.broadcast.emit('sendSimpleMessage', response.data)
            socket.emit('message', response.commandCallback)
        }
        else if(response.spread && response.data.linkPreview !== null){
            socket.broadcast.emit('sendMessageWithLink', response.data)
            socket.emit('message', response.commandCallback)
        }
        else if(!response.spread){
            socket.emit('message', response)
        }
    })

})
