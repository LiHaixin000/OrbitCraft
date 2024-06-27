/*
// src/utils/WebSocketClient.js
const socket = new WebSocket('ws://localhost:8080/ws');

socket.onopen = () => {
  console.log('Connected to WebSocket server');
};

socket.onmessage = (event) => {
  const message = JSON.parse(event.data);
  console.log('Message from server:', message);

  // Handle the message based on its type
  if (message.type === 'newMessage') {
    // Update the UI with the new message
    console.log(`New message in group ${message.groupName}: ${message.text}`);
  }
};

socket.onerror = (error) => {
  console.error('WebSocket error:', error);
};

socket.onclose = () => {
  console.log('WebSocket connection closed');
};

// Function to send a new message
export function sendMessage(groupName, text) {
  const message = JSON.stringify({
    type: 'newMessage',
    groupName,
    text,
  });
  socket.send(message);
}

export default socket;
*/
