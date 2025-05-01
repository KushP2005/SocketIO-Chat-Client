const socket = io()
let username = null

socket.on('registerResponse', function(response) {
  if(response.success) {
    username = response.username
    document.getElementById('registration').style.display = 'none'
    document.getElementById('chat').style.display = 'block'
    document.getElementById('msgBox').disabled = false
    document.getElementById('send_button').disabled = false
    
    // Show acknowledgment message in chat area
    let msgDiv = document.createElement('div')
    msgDiv.textContent = `Welcome ${username}! You are connected to the chat.`
    document.getElementById('messages').appendChild(msgDiv)
  }
})

socket.on('serverSays', function(message) {
  if(!username) return // Don't show messages if not registered
  let msgDiv = document.createElement('div')
  msgDiv.textContent = message
  document.getElementById('messages').appendChild(msgDiv)
})

function registerUser() {
  let usernameInput = document.getElementById('usernameBox').value.trim()
  if(usernameInput === '') return
  
  // Check for reserved username before sending to server
  if(usernameInput.toLowerCase() === 'me') {
    document.getElementById('errorMessage').textContent = 'Username cannot be "Me". Please choose another.'
    return
  }
  socket.emit('register', usernameInput)
}

function sendMessage() {
  if(!username) return // Don't allow sending if not registered
  let message = document.getElementById('msgBox').value.trim()
  if(message === '') return
  socket.emit('clientSays', `${username}: ${message}`)
  document.getElementById('msgBox').value = ''
}

function handleKeyDown(event) {
  const ENTER_KEY = 13 //keycode for enter key
  if (event.keyCode === ENTER_KEY) {
    sendMessage()
    return false //don't propogate event
  }
}

//Add event listeners
document.addEventListener('DOMContentLoaded', function() {
  //This function is called after the browser has loaded the web page

  document.getElementById('connect_button').addEventListener('click', registerUser)
  document.getElementById('send_button').addEventListener('click', sendMessage)

  //add keyboard handler for the document as a whole, not separate elements.
  document.addEventListener('keydown', handleKeyDown)
  //document.addEventListener('keyup', handleKeyUp)
})