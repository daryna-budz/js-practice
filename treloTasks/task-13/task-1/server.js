const express = require('express');
const WebSocket = require('ws');

const app = express();
const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server });

const clients = new Set();

wss.on('connection', (ws) => {
    clients.add(ws);

    ws.on('message', (message) => {
        try {
            const messageText = message.toString();
            const parsedMessage = JSON.parse(messageText); 
            
            for (const client of clients) {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(parsedMessage)); 
                }
            }
        } catch (error) {
            console.error('Помилка обробки повідомлення:', error);
        }
    });
    

    ws.on('close', () => {
        clients.delete(ws);
    });
});


server.listen(3000, () => {
    console.log('WebSocket сервер працює на порту 3000');
});
