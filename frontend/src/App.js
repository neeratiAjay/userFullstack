import {BrowserRouter,Route,Routes} from "react-router-dom"
import Users from "./components/Users"
import CreateUser from "./components/CreateUser"
import './App.css';

const App = ()=>(
<BrowserRouter>
<Routes>
  <Route path = "/" element = {<Users/>}/>
  <Route path = "/newUser" element = {<CreateUser/>}/>
</Routes>
</BrowserRouter>
)

export default App;
