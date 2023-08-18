const Users = require("../model/users.js");


exports.signup = (req, res) => {
  const {
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
  } = req.body;

  // console.log(req.body); return false

  let errors = "";
  if (!first_name) {
    errors = " first_name is required.";
  } else if (!last_name) {
    errors = "last_name  is required.";
  } else if (!mobile) {
    errors = "mobile  is required.";
  } else if (!email) {
    errors = "email  is required.";
  } else if (!password) {
    errors = "password  is required.";
  } else if (!gender) {
    errors = "gender  is required.";
  } else if (!country_id) {
    errors = "country_id  is required.";
  } else if (!state_id) {
    errors = "state_id  is required.";
  } else if (!city_id) {
    errors = "city_id  is required.";
  } else if (!req.files || Object.keys(req.files).length === 0) {
    return res.send({
      error: "yes",
      message: "Profile picture is required.",
      data: [],
    });
  }

  if (errors.length > 0) {
    return res.send({
      success: "no",
      message: errors,
      data: [],
    });
  }

  Users.mobileexist(mobile, (err, resss) => {
    // console.log(resss); return false
    if (resss) {
      return res.send({
        success: "no",
        message: "Mobile number already exists",
        data: [],
      });
    } else {
      Users.emailexist(email, (err, ress) => {
        if (ress) {
          return res.send({
            success: "no",
            message: "Email already exists",
            data: [],
          });
        } else {
          let userimage = req.files.profile_picture;
          // console.log(userimage); return false
          var filename = userimage.name;
          var filepath = "uploads/profile_image/" + filename;
          userimage.mv(filepath, function (err) {});

          Users.createuser(
            first_name,
            last_name,
            mobile,
            email,
            password,
            gender,
            filename,
            country_id,
            state_id,
            city_id,
            (err, data) => {
              let objj={};
              objj["user_id"]=data;
              objj["first_name"]=first_name;
              objj["last_name"]=last_name;
              // console.log(data); return false
              if (data) {
                return res.send({
                  success: "yes",
                  message: "Sign up succcessfully.",
                  data: objj,
                });
              } else {
                return res.send({
                  success: "no",
                  message: "Something happen wrong.",
                  data: [],
                });
              }
            }
          );
        }
      });
    }
  });
};

exports.login = async(req, res) => {
  const { email, password } = req.body;
  let errors = "";
  if (!email) {
    errors = "email id is required";
  } else if (!password) {
    errors = "password is required";
  }

  if (errors.length > 0) {
    return res.send({
      success: "no",
      message: errors,
      data: [],
    });
  }

 await Users.log_in(email, password, (err, resdata) => {
    // console.log(resdata); return false
    if (resdata) {
      return res.send({
        success: "yes",
        message: "Logged in succcessfully.",
        data: resdata,
      });
    } else {
      return res.send({
        success: "no",
        message: "No user registered.kindly sign-up",
        data: [],
      });
    }
  });
};

exports.user_info = (req, res) => {
  const { user_id } = req.body;
  let error = "";
  if (user_id) {
    error = "user_id is required.";
  }

  if (error.length > 0) {
    return res.send({
      success: "no",
      message: error,
      data: [],
    });
  }

  Users.getuserinfo(user_id, (err, userdata) => {
    if (userdata) {
      var obj = {};
      obj["user_id"] = userdata.id;
      obj["full_name"] = `${userdata.first_name} ${userdata.last_name}`;
      obj["first_name"]=userdata.first_name;
      obj["last_name"]=userdata.last_name;
      obj["mobile"] = userdata.mobile;
      obj["email"] = userdata.email;
      obj["password"] = userdata.password;
      obj["gender"] = userdata.gender;
      obj["profile_picture"] = userdata.profile_picture;
      obj["country_id"] = userdata.country_id;
      obj["country_name"] = userdata.country_name;
      obj["state_id"] = userdata.state_id;
      obj["state_name"] = userdata.state_name;
      obj["city_id"] = userdata.city_id;
      obj["city_name"] = userdata.city_name;
      obj["device_type"] = userdata.device_type;
      obj["device_token"] = userdata.device_token;
    }

    return res.send({
      success: "yes",
      message: "aa le user ni kundli.",
      data: obj,
    });
  });
};

exports.updateprofile = (req, res) => {
  const { user_id, first_name, last_name, email, mobile ,profile_picture} = req.body;
  let error = "";
  if (!user_id) {
    error = "user_id is required.";
  } else if (!first_name) {
    error = "first_name is required.";
  } else if (!last_name) {
    error = "last_name is required.";
  } else if (!email) {
    error = "email is required.";
  } else if (!mobile) {
    error = "mobile is required.";
  }

  if (error.length > 0) {
    return res.send({
      success: "no",
      message: error,
      data: [],
    });
  }

  Users.finduserexist(user_id, email, (err, userdata) => {
    if (userdata) {
      return res.send({
        success: "no",
        message: "email allready exists.",
        data: [],
      });
    }

    let userimage = req.files.profile_picture;
    // console.log(userimage); return false
    var filename = userimage.name;
    var filepath = "uploads/profile_image/" + filename;
    userimage.mv(filepath, function (err) {});

    Users.editprofile(
      user_id,
      first_name,
      last_name,
      email,
      mobile,
      filename,
      (err, editeddata) => {
        if (editeddata) {
          return res.send({
            success: "yes",
            message: "update thyi gyu loda",
            data: req.body,
          });
        } else {
          return res.send({
            success: "no",
            message: "something is wrong daya",
            data: [],
          });
        }
      }
    );
  });
};

exports.changepassword = (req, res) => {
  const { user_id, old_password, new_password } = req.body;
  let errors = "";
  if (!user_id) {
    errors = "email is required.";
  } else if (!old_password) {
    errors = "old password is required.";
  } else if (!new_password) {
    errors = "new password is required.";
  }

  if (errors.length > 0) {
    return res.send({
      success: "no",
      message: errors,
      data: [],
    });
  }

  Users.findidandpassexists(user_id, old_password, (err, data) => {
    if (data) {
      var user_id = data.id;
      Users.updatepassword(user_id, new_password, (err, passchange) => {
        if (passchange) {
          var obj = {};
          obj["user_id"] = passchange;
          obj["new_password"] = new_password;

          return res.send({
            success: "yes",
            message: "Password has been changed successfully.",
            data: obj,
          });
        } else {
          return res.send({
            success: "no",
            message: "something is wrong daya",
            data: [],
          });
        }
      });
    }
  });
};

exports.forgotpassword=(req,res)=>{
  const{email}=req.body;
  let errors='';
  if(!email){
    errors="email is required."
  }
 
  if (errors.length > 0) {
    return res.send({
      success: "no",
      message: errors,
      data: [],
    });
  }

  Users.emailexist(email,(err,emaildata)=>{
    if(emaildata){
      return res.send({
        success: "yes",
        message: `We have sent a link to change your password in your email ${email}`,
        data: [],
      });
    }
    else{
      return res.send({
        success: "no",
        message: "Kindly enter your correct email address.",
        data: [],
      });
    }
  })
}



