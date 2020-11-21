const http = require('http').createServer();
const io = require('socket.io')(http);
import ActionService from './services/actionService'

const actionService = new ActionService()
const port = 3000

http.listen(port, () => console.log(`server listening on port: ${port}`))

io.on('connection', (socket) => {
    console.log('connected')
    socket.on('message', async (data) => {
        actionService.indetifyAction(data)
        console.log(data)
        //socket.broadcast.emit('message', evt)
    })
})

io.on('disconnect', (evt) => {
    console.log('disconnected')
})