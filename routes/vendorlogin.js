var express = require('express');
var router = express.Router();
var pool=require('./pool')
require('dotenv').config()
//for fetching value in env
var LocalStorage=require('node-localstorage').LocalStorage 
//maintain the data in your machine
localStorage=new LocalStorage('/scratch')
//fresh localstorage
var jwt=require('jsonwebtoken');

/* function for generate Token */
function generateToken(vendorname)
{
 /* console.log(process.env.TOKEN_SECRET)*/
  return jwt.sign(vendorname,process.env.TOKEN_SECRET,{expiresIn:'1000s'})
}


router.post('/vendorchecklogin',function(req,res,next){
 
    pool.query("select * from outlets where outletid=? and password=?",[req.body.vendorid,req.body.password],function(err,result){
      if(err){
        return  res.status(500).json([])
      }
      else{
          if(result.length==1){
       const vtoken=generateToken({vendorname:result[0].ownername})
        localStorage.setItem('vendortoken',vtoken)
        return  res.status(200).json(result)
      }
      else{
        return  res.status(200).json([]) 
    }
    }
    
    })
  
  })

  router.get('/checktoken',function(req,res,next){
    if(!localStorage.getItem('vendortoken')){
        return res.status(200).json(false) 
    }
    else{
        return res.status(200).json(true)
    }
    
})

  
router.get('/logout',function(req,res){
    localStorage.removeItem('vendortoken')
    return res.status(200).json(true)
})


module.exports = router;
