import {Component} from "react"
import {Link} from "react-router-dom"

import UserItemDetails from "../UserItemDetails"

import"./index.css"

class Users extends Component{
    state = {userData:"",showError:false,errMsg:""}
    
    getUsersData = async()=>{
        try{
        const url ="https://userbackend-4rmz.onrender.com/users"
        
        const response = await fetch(url)
        const usersData = await response.json()
        if(response.ok === true){
            const formatData = usersData.map(user =>({id:user.id,firstName:user.firstname,lastName:user.lastname,email:user.email,department:user.department}))
            
            this.setState({userData:formatData})
        }else{
            
            this.setState({showError:true,errMsg:response.message})
        }
        } catch(e){
            console.log(`App ERROR ${e.message}`)
        }
        
    }
    updateUserDetails = async (props)=>{
        const {id,firstName,lastName,email,department} = props
        try{
        const url = "https://userbackend-4rmz.onrender.com/users"
        const options = {
            method:"PUT",
            headers:{
                'Content-Type':"application/json"
            },
            body: JSON.stringify({firstName:firstName,lastName:lastName,id:id,email:email,department:department})
        }
        const response = await fetch(url,options)
        if(response.ok === true){
            const {userData} = this.state 
            //({firstName:firstName,lastName:lastName,email:email,department:department})
            const updateData = userData.filter(eachUser=>(eachUser.id === id)? ({firstName:firstName,lastName:lastName,email:email,department:department}):(eachUser))

            this.setState({userData:updateData})
            alert("User Details Updated Successfully")
            this.getUsersData()
        }else{
          this.setState({showError:true,errMsg:response.message})
        }
    }catch(e){
        console.log(`App Error ${e.message}`)
    }
    }
    deleteUserDetails = async(id)=>{
        const url = `https://userbackend-4rmz.onrender.com/users/${id}`
        const options = {
            method:"DELETE",
            headers:{
                'Content-Type':"application/json"
            },
        }
        const response = await fetch(url,options)
        if(response.ok === true){
            const {userData} = this.state
            const filterData = userData.filter(eachUser=>eachUser.id !== id)
            alert("User Deleted Successfully")
            this.setState({userData:filterData})

        }else{
            this.setState({showError:true,errMsg:response.message})
        }

    }
    componentDidMount(){
        this.getUsersData()
    }

    render(){
        const {userData,showError,errMsg} = this.state
       

    return (
        <div className="users-container">
        <div className="heading-container">
        <h1 className="heading">Users Details</h1>
        <Link to = "/newUser">
        <button type ="button" className="create-user-btn">New user</button>
        </Link>
        </div>
        {userData.length >0?
        <ul className="users-list-container">
       {userData&& Array.isArray(userData)&&userData.map(eachUser =><UserItemDetails key = {eachUser.id} 
       userDetails = {eachUser} updateUser = {this.updateUserDetails} deleteUser = {this.deleteUserDetails}/>)}
        </ul>
        
        :<h1 className="empty-data heading">User Data Empty</h1>}
        {showError && <p className="errMsg">{errMsg}</p>}
        </div>
    )
    }

}
export default Users