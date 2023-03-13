import express from "express"
import cors from "cors"
import knex from "knex"
import bcrypt from "bcrypt-nodejs"
import handleRegister from "./controllers/register.js"
import handleSigIn from "./controllers/signin.js"
import handleProfileGet from "./controllers/profile.js"
import handleImage from "./controllers/image.js"
import { handleApiCall } from "./controllers/image.js"

const app = express()
app.use(express.json())

app.use(cors())

const db = knex({
	client: "pg",
	connection: {
		host: "127.0.0.1",
		user: "postgres",
		password: "password",
		database: "smart-brain",
	},
})

app.get("/", (req, res) => {
	res.send("success")
})

app.post("/signin", (req, res) => {
	handleSigIn(req, res, db, bcrypt)
})

app.post("/register", (req, res) => {
	handleRegister(req, res, db, bcrypt)
})

app.get("/profile/:id", (req, res) => {
	handleProfileGet(res, req, db)
})

app.put("/image", (req, res) => {
	handleImage(req, res, db)
})

app.post("/imageurl", (req, res) => {
	handleApiCall(req, res)
})

app.listen(3001, () => {
	console.log("app is running on port 3001")
})
