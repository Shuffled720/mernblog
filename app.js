import express from 'express'
import dotenv from "dotenv"
import cors from 'cors'
import bodyParser from 'body-parser'


const app = express()
const PORT = process.env.PORT|| 5000


app.use(cors())
app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))

dotenv.config({path:'./.env'})
import Connection from './db/conn.js'
import router from './router/auth.js'
app.use(router)

app.listen(PORT, () => console.log(`app is listening on PORT ${PORT}!`))

Connection()