'use strict'
const log = console.log
log('Express server')
const express = require('express')

const app = express();

app.use(express.static(__dirname + '/pub'))

app.get('/', (req, res) =>{
	res.send(' this root route')
})

app.get('/someJSON',(req, res) =>{
	res.send({
		name:"Owne",
		year: 5,
	})
})
app.get('/problem',(req,res) =>{
	res.status(500).send("problem with server")
})
const port = process.env.PORT || 5000
app.listen(port, () =>{
	log(`listening on port ${port}`);
})