import http from "http";

const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {

});

server.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});