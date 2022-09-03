const express = require('express')
const app = express()

const port = process.env.port || 5002

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/', async(req,res,next) => {
    res.status(200).send({
        message: 'Welcome test API web blog'
    })
})


app.listen(port, () => {
    console.log(`Server is listening in port ${port}`)
})