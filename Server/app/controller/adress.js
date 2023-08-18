const country = require("../model/country.js");
const state = require("../model/state.js");
const city = require("../model/city.js");


exports.getallcountry = (req, res) => {
  country.getallCountryd((err, data) => {
    if (data) {
      return res.send({
        success: "yes",
        message: "here is list of all countries.",
        data: data,
      });
    } else {
      return res.send({
        success: "No",
        message: "Something happened wrong",
        data: [],
      });
    }
  });
};

exports.getallstates = (req, res) => {
  const { country_id } = req.body;

  state.getallstates(country_id, (err, cdata) => {
    if (cdata) {
        return res.send({
          success: "yes",
          message: "here is list of all states.",
          data: cdata
        });
      } else {
        return res.send({
          success: "No",
          message: "Something happened wrong",
          data: [],
        });
      }
    })
  };

exports.getallcities=(req,res)=>{

const{state_id}=req.body;

city.getcitylist(state_id,(err,citydata)=>{
    // console.log(citydata); return false
    if (citydata.length) {
        return res.send({
          success: "yes",
          message: "here is list of all cities.",
          data: citydata
        });
      } else {
        return res.send({
          success: "No",
          message: "Something happened wrong",
          data: [],
        });
      }
})

}




