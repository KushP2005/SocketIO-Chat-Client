##💬 Real-Time Chat Application
A simple real-time chat application built with Node.js, Express, and Socket.IO. This project allows multiple users to join a web-based chat room, choose a unique username, and send public messages to all connected users.

#🚀 Features
Real-time bi-directional communication using WebSockets

User registration with unique username validation

Welcome messages and server notifications

Keyboard and button interaction to send messages

Simple, extensible frontend (HTML/CSS/JS)

#🛠️ Installation & Running the Server
Clone the repository:

git clone https://github.com/KushP2005/SocketIO-Chat-Client.git
cd SocketIO-Chat-Client
Install dependencies:

npm install express socket.io

Run the server:

node server.js

You can also specify a port:

node server.js 4000

#🔐 Username Rules
Usernames must be unique per session.

The username Me (case-insensitive) is reserved and cannot be used.

#📦 Dependencies
Express

Socket.IO

#📄 License
MIT License © 2025
Created by Kush using a base from Louis D. Nel
