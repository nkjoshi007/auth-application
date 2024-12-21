import React, { useState } from 'react';
import { baseUrl } from './static';
import { useNavigate } from 'react-router-dom';

const CompanyHome = () => {
 const [error,setError] = useState("")
 const navigate = useNavigate()
    const handleLogOut = async () => {
        const path = baseUrl + "logout"
        const response = await fetch(path,{
            method:"POST",
            "Content-Type": "application/json",
        })
        handleResponse(response)
    }

    const handleResponse = async (response) => {
        const apiResponse = await response.json()
        switch(response.status){
            case 200:
             localStorage.removeItem("userDetails");
             localStorage.removeItem("access_token",);
             localStorage.removeItem("refresh_token");
             localStorage.removeItem("user_role");
                 navigate("/")
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
    <div style={webStyle.container}>
      <h2>hy user welcome to the home</h2>
      <button onClick={handleLogOut}>Log out</button>
      {error && <h4 style={webStyle.errorText}>{error}</h4>}
    </div>
  );
}


const webStyle = {
    container:{
        height:"100%",
        width:"100%",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"column"
    },
    errorText:{
        color:"red",
        fontSize:"12px"
    }
}

export default CompanyHome