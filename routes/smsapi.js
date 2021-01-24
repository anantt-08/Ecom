var express = require('express');
var router = express.Router();

var request = require("request");


router.post('/sendotp', function (req, res) {

  console.log("API YES", req.body)

  var options = {
    method: "GET",
    url: ' http://167.114.117.218/GatewayAPI/rest',
    qs: {

      loginid: 'VIKSDIWS',
      password: 'Vikram123@@@',
      msg: req.body.otp,
      // msg:"okay",
      send_to: req.body.mob,
     // send_to:"",
      senderId: 'VIKSDIWS',
      routeId: '8',
      snsContentType: 'english'
    },
    headers: {
      "Cache-Control": "no-cache",

    }
  };
  //A2FACT PASS=352536
  console.log("options:", options)
  request(options, function (error, result, body) {
    if (error) {
      console.log(error)
      return (res.json({
        result: false
      }))
    } else {
      console.log(result)
      return (res.json({
        result: true
      }))

    }
  })

})




module.exports = router;