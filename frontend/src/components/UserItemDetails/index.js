import {useState} from "react"

import "./index.css"

const UserItemDetails = props =>{
 const {userDetails,updateUser,deleteUser} = props 
 const {id,firstName,lastName,email,department} = userDetails
 const [isEdit,setEdit] = useState(false)
 const [editFirstName,setFirstName] = useState(firstName)
 const [editLastName,setLastName] = useState(lastName)
 const [editEmail,setEmail] = useState(email)
 const [editDepartment,setDepartment] = useState(department)

 const submitDetails = (event)=>{
    event.preventDefault()
    updateUser({id:id,firstName:editFirstName,lastName:editLastName,email:editEmail,department:editDepartment})
    setEdit(false)
 }
 
 const onDeleteUser = ()=>{
    deleteUser(id)
 }

    return (<li key ={id} className="list-item-container">
    
        
       {!isEdit && <>
       <div className="user-details-container">
        <p className="name">First Name : <span className="value-text">{firstName}</span></p>
        <p className="name">Last Name : <span>{lastName}</span></p>
        <p className="name">Email : <span>{email}</span></p>
        <p className="name">Department : <span>{department}</span></p>
        </div>
        <div className="btn-container" >
        <button className = "btn-edit" onClick={()=>setEdit(true)}>Edit</button>
        <button className = "btn-delete" onClick={onDeleteUser}>Delete</button>
        </div>
         </>}
        {isEdit&& <form className="edit-form-container" onSubmit={submitDetails}>
          <label className="label" htmlFor="firstName">FIRST NAME</label>
           <input type="text" 
           value={editFirstName} onChange={(e)=>setFirstName(e.target.value)}
           className="input" placeholder="First name" id = "firstName" required/>
           <label className="label" htmlFor="lastName">LAST NAME</label>
           <input type="text" 
           value={editLastName} onChange={(e)=>setLastName(e.target.value)}
           className="input" placeholder="Last name" id = "lastName" required/>
           <label className="label" htmlFor="email">EMAIL</label>
           <input type="text" 
           value={editEmail} onChange={(e)=>setEmail(e.target.value)}
           className="input" placeholder="Email" id = "email" required/>
           <label className="label" htmlFor="department">Department</label>
           <input type="text" 
           value={editDepartment} onChange={(e)=>setDepartment(e.target.value)}
           className="input" placeholder="Department" id = "department" required/>
           <div className="edit-btn-container">
            <button  type = "button" className="cancel-btn" onClick={()=>{setEdit(false)}}>Exit</button>
           <button type = "submit" className="submit-btn">Save</button>
           </div>
          
          </form>}
    </li>)

}
export default UserItemDetails