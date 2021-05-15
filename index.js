const express = require('express')
const app = express()
const cors = require('cors')
const Feed = require('rss-parser')
const parser = new Feed()

app.use(cors())
app.get("/",(req,res)=>{
    res.send("updated")
})
const PORT = process.env.PORT || 4006
app.listen(PORT, ()=> console.log("opennin in "+PORT))