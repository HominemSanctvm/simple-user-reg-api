const express = require('express')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()

app.use(
  express.urlencoded(({
    extended: true
  })
  )
)

app.use(express.json())

// rotas da API
const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)

// connect to database
//
// CRIAR UM DOT ENV PRA ACESSAR AS CREDENCIAIS!!!!
const DB_USER = process.env.DB_USER
const DB_PASSWD = process.env.DB_PASSWD

mongoose.connect(
  `mongodb+srv://${DB_USER}:${DB_PASSWD}@apicluster.ufn64qc.mongodb.net/?retryWrites=true&w=majority`
)
.then( () => {
  console.log('Conectado ao MongoDB')
  app.listen(3000)
})
.catch((err) => {
  console.log('Erro ao se conectar ao banco de dados.')
})

