const express = require('express')

const app = express()
const port = 4000

app.set('views',__dirname+'/views')
app.set('view engine','ejs')

app.use(express.urlencoded())

app.get('/', (req,res)=> {
    res.send("Aum Shah Hello?!!?")
})

app.get('/income', (req,res)=> {
    res.render('income')
})

app.post('/incomeresult', (req,res)=> {
    var s1 = parseFloat(req.body.s1)
    var s2 = parseFloat(req.body.s2)

    var total = s1+s2
    res.render('incomeresult', {s1, s2, total})
})

app.listen(port, ()=> {
    console.log(`App7 Running on Port ${port}`)
})
