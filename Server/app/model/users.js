const sql = require("./db.js");

//constructor
const Users = function (users) {
  this.id = users.id;
  this.first_name = users.first_name;
  this.last_name = users.last_name;
  this.mobile = users.mobile;
  this.email = users.email;
  this.password = users.password;
  this.gender = users.gender;
  this.country_id = users.country_id;
  this.state_id = users.state_id;
  this.city_id = users.city_id;
  this.device_type = users.device_type;
  this.device_token = users.device_token;
  this.profile_picture=users.profile_picture;
};

Users.mobileexist = (mobile, result) => {
  sql.query("SELECT * FROM users WHERE mobile=?", [mobile], (err, res) => {
      // console.log(res); return false
    result(null, res[0]);
    return;
  });
};

Users.emailexist = (email, result) => {
  sql.query("SELECT * FROM users WHERE email=?", [email], (err, res) => {
    result(null, res[0]);
    return;
  });
};

Users.createuser = (
  first_name,
  last_name,
  mobile,
  email,
  password,
  gender,
  profile_picture,
  country_id,
  state_id,
  city_id,
  result
) => {
  sql.query(
    "INSERT INTO users SET first_name=?,last_name=?,mobile=?,email=?,password=?,gender=?,profile_picture=?,country_id=?,state_id=?,city_id=?",
    [
      first_name,
      last_name,
      mobile,
      email,
      password,
      gender,
      profile_picture,
      country_id,
      state_id,
      city_id,
    ],
    (err, res) => {
      // console.log(res); return false
      result(err, res.insertId);
      return;
    }
  );
};

Users.log_in=(email,password,result)=>{
  sql.query(`SELECT id,first_name,last_name,mobile,email,password,gender,CONCAT('` +
  nodeSiteUrl +
  `','/file/profile_image/',profile_picture) as profile_picture,country_id,state_id,city_id,device_type,device_token FROM users WHERE email=? AND password=?`,[email,password],(err,res)=>{
    // console.log(res); return false
    result(null,res[0])
    return
  })
}

Users.getuserinfo=(user_id,result)=>{
  sql.query(`SELECT u.id,u.first_name,u.last_name,u.mobile,u.email,u.password,u.gender,CONCAT('` +
  nodeSiteUrl +
  `','/file/profile_image/',profile_picture) as profile_picture,u.country_id,c.name as country_name,u.state_id,s.name as state_name,u.city_id,ci.name as city_name,u.device_type,u.device_token FROM users as u LEFT JOIN countries as c ON u.country_id=c.id LEFT JOIN states as s ON u.state_id=s.id LEFT JOIN cities as ci  ON u.city_id=ci.id WHERE u.id=?`,[user_id],(err,res)=>{
    // console.log(res); return false
    result(null,res[0])
    return;
  })
}

Users.finduserexist=(id,email,result)=>{
  sql.query(`SELECT * FROM users WHERE email=? and id!=? `,[email,id],(err,res)=>{
    // console.log(res); return false
    result(null,res[0])
    return;
  })
}

Users.editprofile=(user_id,first_name,last_name,email,mobile,profile_picture,result)=>{
  sql.query(`UPDATE users SET first_name=?,last_name=?,email=?,mobile=?,profile_picture=?  WHERE id=?`,[first_name,last_name,email,mobile,profile_picture,user_id],(err,res)=>{
    // console.log(err); return false
    result(null,user_id)
    return;
  })
}

Users.findidandpassexists=(user_id,old_password,result)=>{
  sql.query(`SELECT * FROM users WHERE id=? and password=?`,[user_id,old_password],(err,res)=>{
    // console.log(res); return false
    result(null,res[0])
    return;
  })
}

Users.updatepassword=(user_id,new_password,result)=>{
  sql.query(`UPDATE users SET password=? WHERE id=?`,[new_password,user_id],(err,res)=>{
    result(null,user_id)
    return;
  })
} 



module.exports = Users;
