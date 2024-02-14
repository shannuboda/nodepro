const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const test = require('./routes/test')

app.use(cors())
app.use("/test",test)
app.get('/',(req,res)=>{
    res.send('hhhhh')
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))