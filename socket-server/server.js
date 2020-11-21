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
        socket.emit('message', response)
    })

})

io.on('disconnect', (evt) => {
    console.log('disconnected')
})