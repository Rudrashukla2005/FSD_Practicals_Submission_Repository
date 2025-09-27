const express = require('express')
const fs = require('fs')

const app = express()
const port = 4000

app.get('/', (req,res)=> {
    res.send("Hello Patel Rudra Shukla???")
})

app.get('/logs', (req, res) => {
    fs.readFile("errors.txt", "utf-8", function(err, data){
        if (err) {
            return res.status(500).send(`
                <h1>Error Log Viewer</h1>
                <p style="color:red;">Error: Could not read file.</p>
                <p>Reason: ${err.message}</p>
            `);
        }

        res.send(`
            <h1>Error Log Viewer</h1>
            <pre style="background:#222; color:#0f0; padding:15px; border-radius:8px;">${data}
            </pre>
        `);
    })
})

app.listen(port, ()=> {
    console.log(`App4 Running on Port ${port}`)
})
