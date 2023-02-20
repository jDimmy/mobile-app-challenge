const express = require('express')
const app = express()
const port = 5000;
const landOperator = require('./services/LandOperator')
const landOwner = require('./services/LandOwner')
const landPlot = require('./services/LandPlot')
const Report = require('./services/Report')

app.use('/landoperator', landOperator)
app.use('/landowner', landOwner)
app.use('landplot', landPlot)
app.use('/report', Report)


app.listen(port, () => console.log("l'application tourne à l'adresse http://localhost:" + port) )