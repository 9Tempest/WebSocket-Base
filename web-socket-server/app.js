
const ws = require('nodejs-websocket')
const PORT = 3000

const TYPE_ENTER = 0
const TYPE_MSG = 1
const TYPE_LEAVE = 2

//total user
let count = 0
//Once client connected, a connect object will be created
const server = ws.createServer(connect => {
    console.log('client connected')
    count++
    connect.userName = 'Client'+count.toString()

    //notify all the clients about the there is a new client
    broadcast({
        type: TYPE_ENTER,
        msg: connect.userName + ' entered the chatting room',
        time: new Date().toLocaleDateString()
    })
    //once client sent data, text event will be triggered


    //4 events
    connect.on('text', data=>{
        //notify all the clients about the msg
        console.log("msg received: "+ data)
        //process the data
        broadcast({
            type: TYPE_MSG,
            msg: connect.userName + ' :' + data,
            time: new Date().toLocaleDateString()
        })
    })

    connect.on('close', ()=>{
        broadcast({
            type: TYPE_LEAVE,
            msg: connect.userName + ' left the chatting room',
            time: new Date().toLocaleDateString()
        })
        count--
        console.log('client disconnect!')
        //notify client leave
    })

    connect.on('error', ()=>{
        
    })
    
})

function broadcast(msg){
    server.connections.forEach(item => {
        item.send(JSON.stringify(msg))
    })
}

server.listen(PORT, ()=>{
    console.log('server connected!, listen to the Port: ' + PORT)
})