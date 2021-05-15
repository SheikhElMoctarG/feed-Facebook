const express = require('express')
const app = express()
const cors = require('cors')
const Feed = require('rss-parser')
const parser = new Feed()
const links = require("./links.json")

app.use(cors())
setInterval(() => {
var all = []
function add(name,icon,date,title,description,media) {
    const a = {
        name: name,
        icon: icon,
        date: date,
        title: title,
        description: description,
    }
    all.push(a)
}

async function run() {
    for (const site of links) {
        const now = await parser.parseURL(site.url)
        var icon = now.image.url;
        now.items.forEach(item=>{
            add(item.creator, icon,item.pubDate,item.title,item.content)
        })
    
    }
    
}
run()
app.get("/",(req,res)=>{
    all.sort(function(a,b){
        return new Date(b.date) - new Date(a.date);
    })
    res.send(JSON.stringify(all,null, 3))
})
}, 1000);


const PORT = process.env.PORT || 4006
app.listen(PORT, ()=> console.log("opennin in "+PORT))