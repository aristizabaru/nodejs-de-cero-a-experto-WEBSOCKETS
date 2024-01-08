import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {

    console.log('client connected')

    ws.on('error', console.error);

    ws.on('message', function message(data) {
        const payload = JSON.stringify({
            type: 'custom-message',
            payload: data.toString()
        })

        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(payload, { binary: false });
            }
        });

    });

    ws.on('close', () => {
        console.log('Client disconnected')
    })
});

console.log('Server running on ws://localhost:3000')