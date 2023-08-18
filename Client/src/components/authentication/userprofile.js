import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './userprofile.css'
import Table from 'react-bootstrap/Table'

const Userprofile = () => {
const[userdata,setUserdata]=useState({});

    useEffect(() => {
        getuserprofile();
      }, []);

    const getuserprofile=async()=>{
var user_id=localStorage.getItem("user_id");
const obj={
    user_id:user_id
}
const res = await axios.post("http://localhost:3005/user_info", obj);
      console.log(res);
      if (res.data.success === "yes") {
        setUserdata(res?.data?.data)
      }
    }
  return (
    <div className='main-div'>
        <h1>Profile Information</h1>
    <div className="upperdiv">
        <img  src={userdata.profile_picture} className='user_image'/>
    </div>
    <div className="lowerdiv">
    <Table striped bordered hover>
      <tbody>
        <tr>
          <td>Name</td>
          <td>{userdata.full_name}</td>
        </tr>
        <tr>
          <td>Contact Number</td>
          <td>{userdata.mobile}</td>
        </tr>
        <tr>
          <td>Email Adress</td>
          <td>{userdata.email}</td>
        </tr>
        <tr>
          <td>Password</td>
          <td>{userdata.password}</td>
        </tr>
        <tr>
          <td>Gender</td>
          <td>{(userdata.gender==1)?"Male":"Female"}</td>
        </tr>
        <tr>
          <td>Country</td>
          <td>{userdata.country_name}</td>
        </tr>
        <tr>
          <td>State</td>
          <td>{userdata.state_name}</td>
        </tr>
        <tr>
          <td>City</td>
          <td>{userdata.city_name}</td>
        </tr>

      </tbody>
    </Table>
    </div>
    </div>
  )
}

export default Userprofile
