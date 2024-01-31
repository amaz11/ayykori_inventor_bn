require("dotenv").config();
const app = require("./app");

//SERVER PORT
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`http://localhost:3000/`);
});

//Unhandled promise rejection
process.on("unhandledRejection", (err) => {
    console.log(`Shutt down server for ${err.message}`);
    console.log(`Shutt down server due to Unhandled promise rejection`);
    //  serve close
    server.close(() => {
        process.exit(1);
    });
});