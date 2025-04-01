const http = require("http");
function rqListener(req, res) {
  // console.log("Request received: " + req.url);
  // res.writeHead(200, { "Content-Type": "text/plain" });
  // res.end("Hello World\n");
  // process.exit(): thực hiện hủy đăng kí, nó sẽ dừng lại
  console.log(req.url, req.method, req.headers);
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello from my Node.js Server!</h1></body>");
  res.write("</html>");
  res.end();
}

const server = http.createServer(rqListener);
server.listen(3000);

// eventloop là có một vòng lặp liên tục, miễn là có listener đăng kí và server tạo sẽ tạo
// ra một listener,không bao giờ dừng lại
