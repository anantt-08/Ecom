var express = require('express');
var router = express.Router();
var pool=require('./pool')
var multer=require('./multer')

/* GET home page. */

router.post('/addnewoutlet',multer.single('photo'), function(req, res, next) {
  console.log(req.body)
  console.log(req.file)
  pool.query("insert into outlets(firmname,ownername,mobile,phone,registrationno,gstno,address,state,city,location,photograph,emailid,description,averageprice,ratings,status,password,lat,lng) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
  [req.body.firmname,req.body.ownername,req.body.mobile,req.body.phone,req.body.regno,req.body.gst,req.body.address,req.body.state,req.body.city,req.body.location,req.file.originalname,
    req.body.email,req.body.description,req.body.averageprice,req.body.ratings,req.body.status,req.body.password,req.body.lat,req.body.long],
  function(error,result){
    if(error){
      console.log(error)
      return res.status(500).json({RESULT:false})
    }
    else{
      console.log(result)
      return res.status(200).json({RESULT:true})
       
    }
  })
});

router.get('/displayall',function(req,res,next){
  pool.query("select o.*,(select S.statename from states S where S.stateid=o.state) as statename,(select C.cityname from city C where C.cityid=o.city) as cityname from outlets o",function(err,result){
    if(err){
      return  res.status(500).json([])
    }
    else{
      return  res.status(200).json(result)
    }
  })

})

router.post('/deleteRecord',function(req,res,next){
  pool.query("delete from outlets where outletid=?",[req.body.outletid],function(err,result){
    if(err){
      return  res.status(500).json([])
    }
    else{
      return  res.status(200).json(result)
    }
  })

})

router.post('/updateRecord',multer.any(), function(req, res, next) {
  console.log(req.body)
  if(req.body.photo!=''){
    q="update outlets set firmname=?,ownername=?,mobile=?,phone=?,registrationno=?,gstno=?,address=?,state=?,city=?,location=?,emailid=?,description=?,averageprice=?,ratings=?,status=?,password=?,lat=?,lng=?,photograph=? where outletid=?"
    pm=[req.body.firmname,req.body.ownername,req.body.mobile,req.body.phone,req.body.regno,req.body.gstno,req.body.address,req.body.state,
      req.body.city,req.body.location,req.body.emailid,req.body.description,req.body.averageprice,
      req.body.ratings,req.body.status,req.body.password,req.body.lat,req.body.lng,req.files[0].originalname,req.body.outletid]
  }
  else{
    q="update outlets set firmname=?,ownername=?,mobile=?,phone=?,registrationno=?,gstno=?,address=?,state=?,city=?,location=?,emailid=?,description=?,averageprice=?,ratings=?,status=?,password=?,lat=?,lng=? where outletid=?"
    pm=[req.body.firmname,req.body.ownername,req.body.mobile,req.body.phone,req.body.regno,req.body.gstno,req.body.address,req.body.state,
      req.body.city,req.body.location,req.body.emailid,req.body.description,req.body.averageprice,
      req.body.ratings,req.body.status,req.body.password,req.body.lat,req.body.lng,req.body.outletid] }
  
        pool.query(q,pm,function(error,result){
      if(error){
           console.log(error)
        return  res.status(500).json({RESULT:false})
      }
      else{
        console.log(result)
      return  res.status(200).json({RESULT:true})

      }
  })
  
});


module.exports = router;

