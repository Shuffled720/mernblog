import express from 'express'
import dotenv from "dotenv"
import cors from 'cors'
import bodyParser from 'body-parser'


const app = express()
const port = 5000 || process.env.PORT


app.use(cors())
app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))

dotenv.config({path:'./.env'})
import Connection from './db/conn.js'
import router from './router/auth.js'
app.use(router)

app.listen(port, () => console.log(`app is listening on port ${port}!`))

Connection()