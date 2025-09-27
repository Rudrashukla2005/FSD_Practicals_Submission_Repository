const express = require('express')

const app = express()
const port = 4000

app.set('views',__dirname+'/views')
app.set('view engine','ejs')

app.get('/', (req,res)=> {
    res.send("Hii Rudra Shukla!!!")
})

app.get('/homedashboard', (req,res)=> {
    res.render('homedashboard', {name: "Rudra"})
})

app.listen(port, ()=> {
    console.log(`App5 Running on Port ${port}`)
})
