import React, { useState } from 'react';
import { baseUrl } from './static';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [userDetails,setuserDetails] = useState({username:"",password:""})
    const [error,setError] = useState("")
    const navigate = useNavigate()
    const handleChange = (event) => {
        setuserDetails({...userDetails,[event.target.name]:event.target.value})
        setError("")
    }

    const handleSubmit = async () => {
        const path = baseUrl + 'login'
        const response = await fetch(path,{method:"POST",
        body: JSON.stringify(userDetails),
        headers: {
            "Content-Type": "application/json",
        },
    })
    loginResponse(response)
    }


    const loginResponse = async (response) => {
        const apiResponse = await response.json()
        switch(response.status){
            case 200:
             localStorage.setItem("userDetails",JSON.stringify(apiResponse));
             localStorage.setItem("access_token",JSON.stringify(apiResponse.access_token));
             localStorage.setItem("refresh_token",JSON.stringify(apiResponse.refresh_token));
             localStorage.setItem("user_role",JSON.stringify(apiResponse.user.role));
             if(apiResponse.user.role === "Admin"){
                 navigate("/admin-home")
             }else{
                 navigate("/company-home")
             }
             break;
            case 401:
             setError(apiResponse.detail);
            break; 
            case 500:
             setError(apiResponse.detail);
            break; 
            default:
            return;
        }
    }
  return (
    <div>
        <h1>Login page</h1>
      <div style={webStyle.container}>
        <input name='username' type='text' value={userDetails.userName} placeholder='enter your user name' onChange={handleChange}/>
        <input name='password' type='password' value={userDetails.password} placeholder='enter your password' onChange={handleChange}/>
        <button disabled={!(userDetails.username && userDetails.password)} onClick={handleSubmit}>submit</button>
        {error && <h4 style={webStyle.errorText}>{error}</h4>}
      </div>
    </div>
  );
}

const webStyle = {
    container:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"column",
        gap:"20px"
    },
    errorText:{
        color:"red",
        fontSize:"12px"
    }
}