import './App.css';
import RoleBasedRender from './RoleBasedRender';
import AdminHome from './components/AdminHome';
import CompanyHome from './components/CompanyHome';
import Login from './components/login';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import { baseUrl } from './components/static';
import { useEffect } from 'react';

function App() {
  const pathComponent = [
    {
    path:"/",
    roles:["Admin","company"],
    component:<Login />
   },
    {
    path:"/admin-home",
    roles:["Admin"],
    component:<AdminHome />
   },
    {
    path:"/company-home",
    roles:["company"],
    component:<CompanyHome />
   }
]

  const refreshToken = async () => {
    const path = baseUrl + "/refresh"
    const response =  await fetch(path,{
      method:"POST",
      headers:{
        token:JSON.parse(localStorage.getItem("access_token")),
        "Content-Type": "application/json",
      }
    })
    refreshTokenResponse(response)
  }

  const refreshTokenResponse = async (response) => {
    const apiResponse = await response.json()
    switch(response.status){
        case 200:
         localStorage.setItem("userDetails",JSON.stringify(apiResponse));
         localStorage.setItem("access_token",JSON.stringify(apiResponse.access_token));
         localStorage.setItem("refresh_token",JSON.stringify(apiResponse.refresh_token));
         localStorage.setItem("user_role",JSON.stringify(apiResponse.user.role));
         break;
         case 500:
            break;
        default:
        return;
    }
}

  useEffect(()=>{
    const userRole = JSON.parse(localStorage.getItem("user_role"))
    if(userRole){
      refreshToken()
    }
  })
  return (
    <div className="App">
     <Router>
      <Routes>
        {pathComponent.map((pathValue,index)=> 
        <Route key={index} path={pathValue.path} element={<RoleBasedRender pathValue={pathValue}/>}/>
        )}
      </Routes>
     </Router>
    </div>
  );
}

export default App;
