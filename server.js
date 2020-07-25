'use strict'
const log = console.log
log('Express server')
const express = require('express')

const app = express();

app.use(express.static(__dirname + '/pub'))


const port = process.env.PORT || 5000
app.listen(port, () =>{
	log(`listening on port ${port}`);
})

//The link: https://radiant-cliffs-78481.herokuapp.com/