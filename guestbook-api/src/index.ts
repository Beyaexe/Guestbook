import express from "express"
import router from "./routes/routes.js"
import cors from "cors"

const app = express()
app.use(cors());

app.use(express.json());

app.use(express.static("public"))

app.use(router)

app.listen(3000, () =>{

})