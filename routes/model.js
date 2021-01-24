var express = require('express');
var router = express.Router();
var pool=require('./pool')
var multer=require('./multer')

/* GET home page. */

router.post('/addnewmodel',function(req, res, next) {
  if(!localStorage.getItem('token')){
    return res.status(200).json('Session has Expired Please Login Again')
  }
    console.log(req.body)
    pool.query("insert into model(brandid,modelname,description) values(?,?,?)",
    [req.body.brandid,req.body.modelname,req.body.description],function(err,result){
        if(err){
             console.log(err)
          return  res.status(500).json({RESULT:false})
        }
        else{
          console.log(result)
        return  res.status(200).json({RESULT:true})
  
        }
    })
  });

  router.get('/displayall',function(req,res,next){
    if(!localStorage.getItem('token')){
      return res.status(200).json('Session has Expired Please Login Again')
    }
    pool.query("select * from model",function(err,result){
      if(err){
        return  res.status(500).json([])
      }
      else{
        return  res.status(200).json(result)
      }
    })
  
  })

  router.post('/deleteRecord',function(req,res,next){
    if(!localStorage.getItem('token')){
      return res.status(200).json('Session has Expired Please Login Again')
    }
    pool.query("delete from model where modelid=?",[req.body.modelid],function(err,result){
      if(err){
        return  res.status(500).json([])
      }
      else{
        return  res.status(200).json(result)
      }
    })
  
  })
  
  router.post('/updateRecord',function(req, res, next) {
    if(!localStorage.getItem('token')){
      return res.status(200).json('Session has Expired Please Login Again')
    }
    console.log(req.body)
    pool.query("update model set brandid=?,modelname=?,description=? where modelid=?",
    [req.body.brandid,req.body.modelname,req.body.description,req.body.modelid],function(err,result){
        if(err){
             console.log(err)
          return  res.status(500).json({RESULT:false})
        }
        else{
          console.log(result)
        return  res.status(200).json({RESULT:true})
  
        }
    })
  });

  router.post('/displaybyid',function(req, res, next) {
    console.log(req.body)
    pool.query("select * from model where brandid=?",[req.body.brandid],function(err,result){
        if(err){
             console.log(err)
          return  res.status(500).json([])
        }
        else{
          console.log(result)
        return  res.status(200).json(result)
  
        }
    })
  });


module.exports = router;
