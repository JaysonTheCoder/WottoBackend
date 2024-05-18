const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
const path = require('path')
const cors = require('cors')
app.use(express.static(path.join(__dirname, 'WaterBilling')))
app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(cors())

app.get('/' , (req, res) =>{
  res.sendFile(__dirname + '/Waterbilling/index.html')
})
app.listen(port, () => console.log('Listening...'))