const express = require('express')

const app = express()
const port = 4000

app.set('views',__dirname+'/views')
app.set('view engine','ejs')

app.use(express.urlencoded())

app.get('/', (req,res)=> {
    res.send("Hello Hi Rudra Shukla!??!")
})

app.get('/maths', (req,res)=> {
    res.render('maths')
})

app.post('/mathsans', (req,res)=> {
    var a = parseFloat(req.body.num1)
    var b = parseFloat(req.body.num2)

    if(isNaN(a) || isNaN(b)){
        return res.send("Invalid Input. Please enter valid input numbers")
    }

    let add = a+b;
    let sub = a-b;
    let mul = a*b;
    let div = b != 0 ? (a/b).toFixed(2) : "Division by Zero is Not Allowed";
    res.render('mathsans', {a, b, add, sub, mul, div})
})

app.listen(port, ()=> {
    console.log(`App6 Running on Port ${port}`)
})
