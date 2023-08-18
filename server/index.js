const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();

app.use(express.json());
app.use(cors());

const connection = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'procademy',
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database: ', err);
        return;
    }
    console.log('Connected to MySQL database');
});

app.get('/fetchUser', (req, res) => {
    connection.query('SELECT * FROM user_tbl', (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred');
        } else {
            res.send(result);
        }
    });
});

app.get('/user/:id', (req, res) => {
    const { id } = req.params;
    connection.query(`SELECT * FROM user_tbl WHERE id = ${id}`, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred');
        } else {
            res.send(result);
        }
    });
});


app.post('/create', (req, res) => {
    const { name, codename, teamname, interest, email, password, status, role } = req.body;

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred');
        } else {
            connection.query(
                'INSERT INTO user_tbl (name, codename, teamname, interest, email, password, status, role) VALUES (?, ?, ?, ?, ? ,? ,? ,?)',
                [name, codename, teamname, interest, email, hash, status, role],
                (err, result) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send('An error occurred');
                    } else {
                        res.send('Values Inserted');
                    }
                }
            );
        }
    });
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    connection.query("SELECT * FROM user_tbl WHERE username = ?;",
        username,
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }
            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if (response) {
                        res.send(result)
                    } else {
                        res.send({ message: "Wrong username/password combination!" });
                    }
                })
            } else {
                res.send({ message: "User doesn't exist" })
            }

        }
    );
})

app.listen(8002, () => {
    console.log('Server listening on port 8002');
});
