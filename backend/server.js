const express = require("express");
const app = express();
const port = 3000;


app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.get("/", (req, res) => {
    res.json({ message: "ok" });
});



const info = require('./routes/info');
app.use("/info", info);


//Routes

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
