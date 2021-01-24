var express = require('express');
var router = express.Router();
var pool = require('./pool')


/* GET home page. */
router.post('/addnewrecord',function(req, res, next) {
  console.log(req.body)
  pool.query("insert into userdetails (mobileno,firstname,lastname,emailaddress,password,city,state,country,zipcode,address1,address2,addressstatus)values(?,?,?,?,?,?,?,?,?,?,?,?)",
  [req.body.mobileno,req.body.firstname,req.body.lastname,req.body.emailaddress,req.body.password,req.body.city,req.body.state,req.body.country,req.body.zipcode,
    req.body.address1,req.body.address2,false],function(error,result){
   
    if(error)
    {   console.log(error)
        return res.status(500).json({'RESULT':false}) }
    else
    { return res.status(200).json({'RESULT':true}) }
})
    
});
    

router.post('/addaddress',function(req, res, next) {
  console.log(req.body)
  pool.query("update userdetails set address1=?,address2=?,city=?,state=?,zipcode=?,country='INDIA',addressstatus=true where mobileno=?",[req.body.address1,req.body.address2,req.body.city,req.body.state,req.body.zipcode,req.body.mobileno],function(error,result){
   
    if(error)
    {   console.log(error)
        return res.status(500).json({'RESULT':false}) }
    else
    { return res.status(200).json({'RESULT':true}) }
})
    
});
router.post('/checkuserrecord',function(req, res, next) {

  pool.query("select * from userdetails where mobileno=?",[req.body.mobileno],function(error,result){
   if(error)
   {
    return res.status(500).json({'RESULT':'ERROR','DATA':[]}) 


   }
   else
   { if(result.length==0)
    {
      return res.status(200).json({'RESULT':'NOT FOUND','DATA':[]}) 
    }
    else
    {
      return res.status(200).json({'RESULT':'FOUND','DATA':result}) 

    }


   }


  })


})
module.exports = router;


