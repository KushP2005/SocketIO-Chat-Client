/*
(c) 2025 Louis D. Nel
Based on:
https://socket.io\

Chat Client Server created from base code by Louis D. Nel
Kush
*/

const express = require('express')
const app = express()
const server = require('http').createServer(app)  
const io = require('socket.io')(server)
const path = require('path')
const PORT = process.argv[2] || process.env.PORT || 3000

// Serve static files from ROOT_DIR
const ROOT_DIR = 'html'
app.use(express.static(ROOT_DIR))

const connectedUsers = new Set()

// Socket Server
io.on('connection', function(socket) {
  console.log('client connected')

  socket.on('register', function(username) {
    // Add check for 'me' in any case
    if(username.toLowerCase() === 'me' || connectedUsers.has(username)) {
      socket.emit('registerResponse', {
        success: false,
        username: username
      })
    } else {
      connectedUsers.add(username)
      socket.username = username
      socket.emit('registerResponse', {
        success: true,
        username: username
      })
    }
  })

  socket.emit('serverSays', 'You are connected to CHAT SERVER')

  socket.on('clientSays', function(data) {
    if(!socket.username) return // Don't allow if not registered
    io.emit('serverSays', data) 
  })

  socket.on('disconnect', function() {
    if(socket.username) {
      connectedUsers.delete(socket.username)
    }
    console.log('client disconnected')
  })
})

server.listen(PORT, () => {
  console.log(`Server Running at port ${PORT}  CNTL-C to quit`)
  console.log(`To Test:`)
  console.log(`Open several browsers to: http://localhost:${PORT}/chatClient.html`)
})