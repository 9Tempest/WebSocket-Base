const TYPE_ENTER = 0
const TYPE_MSG = 1
const TYPE_LEAVE = 2

var socket = new WebSocket('ws://localhost:3000')

var input = document.querySelector('input');
var button = document.querySelector('button')
var div = document.querySelector('div');

socket.addEventListener('open', function(){
    div.innerHTML = 'Connect succeeded!'
})


//send msg to websocket
button.addEventListener('click', function(){
    var value = input.value
    socket.send(value)
    input.value = ''
})

//receive msg from websocket
socket.addEventListener('message', function(e){
    var data = JSON.parse(e.data)
    var dv = document.createElement('div')
    dv.innerText = '['+data.time+'] '+data.msg
    if (data.type === TYPE_ENTER){
        dv.style.color = 'green'
    }   else if (data.type === TYPE_LEAVE){
        dv.style.color = 'red'
    }
    div.appendChild(dv)
})

socket.addEventListener('close', function(){
    div.innerHTML = 'server disconnected!'
})