const books = require('./booksModule');

//or
//const {createBook} =require('./booksModule')

const http = require('http');
http.createServer((req,res) => {

    console.log(req.url);
    console.log(req.method);
    switch (req.url) {
        case "/readBook":
            books.readBook(req,res);
            break;
        case "/readSpecificBook":
            books.readSpecificBook(req,res);
            break;

        default:
            res.write("No Routes Found");
            res.end();
            break;
    }


}).listen(4000,()=> console.log("Server is running at port 4000"));


