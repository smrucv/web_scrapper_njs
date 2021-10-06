const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const app = express()

const URL = "https://dolartoday.com"

app.listen(PORT, () => console.log(`Server running on Port ${PORT}`))

app.get('/', (req, res) => {
    axios(URL).then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const news = []
    
        $('.post.type-post', html).each(function() {
            const text = $(this).find('div.post-title a').attr('title')
            const url = URL + $(this).find('div.post-title a').attr('href')
            const img = $(this).find('div.post-image img').attr('src')
        
            news.push({
                'titulo':text,
                'url':url,
                'img':img
            })
        })
      
        res.send(news)
    }).catch(err => console.log(err))    
})