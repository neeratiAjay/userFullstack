import {useState} from "react"
import {Link} from "react-router-dom"
import "./index.css"

const CreateUser = ()=>{
const [firstName,setFirstName] = useState("")
const [lastName,setLastName] = useState("")
const [email,setEmail] = useState("")
const [department,setDepartment] = useState("")
const [showError,setError] = useState(false)
const [errMsg,setErrMsg] = useState("")

const addUser = async(event)=>{
    event.preventDefault()
    const url = "http://localhost:4000/users"
    const options ={
        method:"POST",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({firstName:firstName,lastName:lastName,email:email,department:department})
    }
      const response=await fetch(url,options)

      if(response.ok === true){
         alert("User Added Successfully")
         setFirstName("")
         setLastName("")
         setEmail("")
         setDepartment("")
      }else{
       setError(true)
       setErrMsg(response.message)
      }
   

}

    return (
        <div className = "bg-container">
            <Link to ="/" className="home">Home</Link>
            <h1 className="heading">Enter User Details</h1>
         <form className="cart-container" onSubmit={addUser}>
           <label className="label" htmlFor="firstName">FIRST NAME</label>
           <input type="text" 
           value={firstName} onChange={(e)=>setFirstName(e.target.value)}
           className="input" placeholder="First name" id = "firstName" required/>
           <label className="label" htmlFor="lastName">LAST NAME</label>
           <input type="text" 
           value={lastName} onChange={(e)=>setLastName(e.target.value)}
           className="input" placeholder="Last name" id = "lastName" required/>
           <label className="label" htmlFor="email">EMAIL</label>
           <input type="text" 
           value={email} onChange={(e)=>setEmail(e.target.value)}
           className="input" placeholder="Email" id = "email" required/>
           <label className="label" htmlFor="department">Department</label>
           <input type="text" 
           value={department} onChange={(e)=>setDepartment(e.target.value)}
           className="input" placeholder="Department" id = "department" required/>
           <button type = "submit" className="submit-btn">Add User</button>
         </form>
        {showError && <p className="error-text">{errMsg}</p>}
        </div>
    )

   
}
export default CreateUser