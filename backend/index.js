const express = require("express")
const sqlite3 = require("sqlite3")
const {open} = require("sqlite")
const path = require("path")
const cors = require("cors")
const { request } = require("http")

const app = express()

const dbPath = path.join(__dirname,"user.db")
app.use(cors({
    origin: 'https://userfrontend-8qks.onrender.com', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
  }));

app.use(express.json())

let db = null 

const initializeDBAndServer = async()=>{
    try{
db = await open({
    filename:dbPath,
    driver:sqlite3.Database
})
app.listen(4000,()=>{
    console.log("server Running at http://localhost:4000/")
})
    }catch(e){
        console.log(`Db Error : ${e.message}`)
    }
}

initializeDBAndServer()

// POST API 
app.post("/users",async(request,response)=>{
    try{
    const{firstName,lastName,email,department} = request.body
    

    const insertQuary = `INSERT INTO user (firstname,lastname,email,department)
    VALUES (?,?,?,?)
    `
    await db.run(insertQuary,[firstName,lastName,email,department])
    response.send("User Added Successfully")

    
    
    }catch(e){
        response.status(500)
        response.send({message:`Server Error ${e.message}`})
    }
})
// GET API 

app.get("/users", async(request,response)=>{
    try{
    const sqlQuary = `SELECT * FROM user`

    const dbResponse = await db.all(sqlQuary);
    response.send(dbResponse)
    
    }catch(e){
        response.status(500);
        response.send({message:`Server Error ${e.message}`})
    }
})

// PUT API 
app.put("/users",async(request,response)=>{
    const {id,firstName,lastName,department,email} = request.body
    try{
      const updateUser =`UPDATE user 
       SET firstname = ?,lastname =?,email =?,department =? 
       WHERE id = ?`
       await db.run(updateUser,[firstName,lastName,email,department,id])
       response.send("User Updated Successfully")
    }catch(e){
        response.status(500)
        response.send({message:`Server Error ${e.message}`})
    }
})

// DELETE API 
app.delete("/users/:id",async(request,response)=>{
    try{
        const {id} = request.params
        const deleteQuary = `DELETE FROM user WHERE id = ${id}`
       
        await db.run(deleteQuary)
        response.send("USer Deleted Successfully")
    }catch(e){
        response.status(500)
        response.send({message:`Server Error ${e.message}`})
    }
})

