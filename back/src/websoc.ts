import  {WebSocketServer} from "ws";


export function registerWs(ws: WebSocketServer) {
    ws.on('connection', ws => {
        ws.on("error", e => ws.send(e.message));
    })

    ws.on("gsi", gsiData => {
        ws.clients.forEach(client => client.send(JSON.stringify(gsiData)));
    })
}
