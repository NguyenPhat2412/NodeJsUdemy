const http = require("http");
const fs = require("fs");
function rqListener(req, res) {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>My Second Page</title></head>");
    res.write(
      `<body><form action = "/message" method = "POST" ><input type = "text" name = "message" placeholder = "Enter"><button type = "submit">Send</button></form></body>`
    );
    res.write("</html>");
    return res.end(); // Dừng hẳn chương trình sau khi phản hồi
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk); // in ra các chunk dữ liệu
      body.push(chunk); // lưu trữ các chunk dữ liệu vào mảng body;
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString(); // nối các chunk lại với nhau
      const message = parsedBody.split("=")[1]; // tách chuỗi theo dấu "=" và lấy phần tử thứ 2
      console.log(message); // in ra message
      fs.writeFileSync("message.txt", message); // ghi vào file message.txt
      console.log(parsedBody); // in ra cac chunk da noi lai voi nhau
    });
    // fs.writeFileSync("message.txt", "DUMMY");
    res.writeHead(302, { Location: "/" }); // Chuyển hướng về trang chủ
    return res.end(); // Dừng hẳn chương trình sau khi phản hồi
  }

  // Mặc định cho các đường dẫn khác
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
