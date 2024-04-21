import {WebSocketServer} from "ws";

interface State {
    granades: {
        [key: string]: number
    }
    allplayers: {
        [key: string]: {
            name: string
            observer_slot: number
            team: string
            match_stats: any
            position: string
            forward: string
            state: any
            weapons: any
        }
    }
}


export function registerGsi( router: any, websocket: WebSocketServer) {
    router.post("/gsi", (context: any) => {
        const userAgent = context.request.headers['user-agent']
        if (! userAgent.startsWith('Valve/Steam HTTP Client')) return context.status = 400
        const body = context.request.body
        if (body.allplayers === undefined){

        }
        websocket.emit("gsi", body)
    })
}


