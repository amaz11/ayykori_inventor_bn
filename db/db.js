const { default: mongoose } = require("mongoose");
mongoose
    .connect(process.env.DATABASE_URL,)
    .then(() => {
        console.log("DB Connected SuccsesFull");
    })
    .catch((err) => {
        console.log("DB Connect Fail:", err.message);
    });