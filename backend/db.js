const sqlite3 = require("sqlite3").verbose()

const db = new sqlite3.Database("./user.db")
db.serialize( async()=>{
    db.run(`CREATE TABLE IF NOT EXISTS user(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstname TEXT NOT NULL,
        lastname TEXT NOT NULL,
        email TEXT NOT NULL,
        department TEXT NOT NULL)`,(err)=>{
            if(err){
                console.log(`Create Table Error :${e.message}`)
            }
        })
       
});
exports.module = db