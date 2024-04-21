export const wsConnection = new WebSocket("ws://127.0.0.1:3001");

export default function wsInit() {
  wsConnection.onopen = function () {
    console.log("Соединение установлено.");
  };
}
