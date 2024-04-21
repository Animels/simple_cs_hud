import {registerGsi} from "./gsi.js";
import Koa from 'koa'
import http from "http";
import bodyParser from 'koa-bodyparser'
import KoaCompress from 'koa-compress'
import KoaRouter from 'koa-router'
import {registerWs} from "./websoc.js";
import WebSocket from "ws";


const app = new Koa()
const server = http.createServer(app.callback())
const port = 3001
app.use(KoaCompress())
app.use(bodyParser({
    strict: true,
    enableTypes: ['json'],
}))



const websocket = new WebSocket.Server({server});
const router = new KoaRouter()

registerGsi(router, websocket)
registerWs(websocket)


app.use(router.routes())
app.use(router.allowedMethods())
server.listen(port, "127.0.0.1")
console.log("Started server on port " + port)
