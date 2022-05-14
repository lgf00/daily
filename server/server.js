const express = require('express')
const cors = require('cors')
const PORT = process.env.PORT || 5000
const { OAuth2Client } = require('google-auth-library')
const mysql = require('mysql2')

const client = new OAuth2Client(process.env.CLIENT_ID)
const app = express()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "DeMonioK1212#45",
    database: "daily"
});

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true
    })
)
app.use(express.json())

app.get("/api", (req, res) => {
    res.json({ message: "Hello from Express!" });
});

app.post("/api/login", async (req, res) => {
    console.log("API LOGIN")
    const token = {
        clientId: req.body.clientId,
        credential: req.body.credential,
        select_by: req.body.select_by
    }
    const ticket = await client.verifyIdToken({
        idToken: token.credential,
        audience: token.clientId
    });
    const { sub, given_name, family_name, email, picture } = ticket.getPayload();
    const display_name = given_name + " " + family_name
    let sql = `INSERT INTO users (user_id, display_name, email)
    SELECT * FROM (SELECT "${sub}" AS user_id, "${display_name}" AS display_name, "${email}" AS email) AS temp
    WHERE NOT EXISTS (
        SELECT user_id FROM users WHERE user_id = "${sub}"
    ) LIMIT 1;`
    db.query(sql, (err, result) => {
        if (err) {
            res.status(502);
            res.send("error creating user in database")
        }
        console.log(result)
        let body = {
            id: sub,
            display_name: display_name,
            email: email,
            init: false
        }
        console.log(body)
        if (result.affectedRows === 1) {
            console.log("init true")
            body.init = true
        }
        console.log(body)
        res.status(201)
        res.json(body)
    })
})

//app.post("/api/scale")
//app.get("/api/scale")

//app.get("/api/days")
//app.post("/api/days")

//app.get("/api/user")
// app.post("/api/user", async (req, res) => {
//     console.log(req)
//     res.json({test: "test 200"})
// })

app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)})
