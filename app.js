const express = require('express');
const cors = require("cors");
const app = express();
const port = 5005;


//middleware
app.use(express.json())
app.use(cors());


const server = app.listen(port, () => {
  console.log(`Server connection on  http://127.0.0.1:${port}`);  // Server Connnected
});

// Socket Layer over Http Server
const io = require('socket.io')(server, {
  cors: {origin: "*"},
  allowEIO3: true
});

// On every Client Connection
io.on('connection', (socket) => {
  console.log("Made socket connection");

  socket.on("disconnect", () => {
    console.log("Made socket disconnected");
  });

});

// Send Notification API
app.post('/infacto-route', (req, res) => {


  console.log("data: ", req?.body)

  const {payload, clientId, messageType} = req?.body

  const emit = io.emit(clientId, req?.body);

  if(emit){
    res.send({
      status:'200',
      message:"Notification sent successfully"
    });
  }

  
});