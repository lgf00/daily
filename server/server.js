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
});;

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
    let body = null
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
    let init = true // added onto response whether first time user (true) or not (false)
    let sql = `SELECT 1 FROM users WHERE user_id=${sub}`
    db.query(sql, (err, result) => {
        if (err) {
            res.status(501).json(err);
        }
        if (result.length === 0) {
            console.log("NEW USER")
        } else {
            console.log("RETURNING USER")
            init = false // old user
        }
        console.log("INBETWEEN", init)
        if (init) {
            console.log("INSIDE", init)
            sql = `INSERT INTO users (user_id, display_name, email) VALUES ("${sub}", "${display_name}", "${email}")`
            db.query(sql, (err, result) => {
                if (err) {
                    res.status(502).json(err);
                }
                console.log("INSERT RESULT", result)        
            })
        }
        sql = `SELECT * FROM users WHERE user_id=${sub}`
        db.query(sql, (err, result) => {
            if (err) {
                res.status(503).json(err);
            }
            body = result[0]
            body.init = init
            res.status(201).json(body);
        })
    })
        
})

//app.post("/api/scale")
//app.get("/api/scale")

//app.get("/api/days")
//app.post("/api/days")

//app.get("/api/user")
app.post("/api/user", async (req, res) => {
    let { user_id, display_name, email, 
        scale_name, max_points, rating_theme } = req.body
    const sql = `UPDATE users SET \
                 display_name="${display_name}",\
                 email="${email}",\
                 scale_name="${scale_name}",\
                 max_points=${max_points},\
                 rating_theme="${rating_theme}"\
                 WHERE user_id="${user_id}"`
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            res.status(501).send(err)
        } else {
            res.status(200).send()
        }
    })
})

app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)})
