var express = require('express');
var router = express.Router();
var pool=require('./pool')
var multer=require('./multer')

/* GET home page. */

router.post('/addnewproduct',multer.any(), function(req, res, next) {
  if(!localStorage.getItem('vendortoken'))
  { return  res.status(200).json('Session has Expired Please Login Again')}

//console.log(req.body)
//console.log(req.files)
  pool.query("insert into product(productname,description,price,offerprice,delivery,ratings,color,vendorstatus,adstatus,offertype,stock,outletid,categoryid,brandid,modelid,picture,ad) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
  [req.body.productname,req.body.description,req.body.price,req.body.offerprice,req.body.delivery,
    req.body.ratings,req.body.color,req.body.vendorstatus,req.body.adstatus,req.body.offertype,
    req.body.stock,req.body.vendorid,req.body.categoryid,req.body.brandid
    ,req.body.modelid,req.files[0].originalname,req.files[1].originalname],function(err,result){
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
  pool.query("select * from product",function(err,result){
    if(err){
      return  res.status(500).json([])
    }
    else{
      return  res.status(200).json(result)
    }
  })

})


router.post('/deleteRecord',function(req,res,next){
  if(!localStorage.getItem('vendortoken'))
  { return  res.status(200).json('Session has Expired Please Login Again')}
 
  pool.query("delete from product where productid=?",[req.body.productid],function(err,result){
    if(err){
      return  res.status(500).json([])
    }
    else{
      return  res.status(200).json(result)
    }
  })

})

router.post('/displaybymodelid',function(req, res, next) {
  
  console.log(req.body)
  pool.query("select * from product where modelid=?",[req.body.modelid],function(err,result){
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

router.get('/displaystockbybrand',function(req,res,next){
  pool.query("select P.*,(select B.brandname from brand B where P.brandid=B.brandid)as brandname from product P",function(err,result){
    if(err){
      return  res.status(500).json([])
    }
    else{
      console.log(result)
      return  res.status(200).json(result)
    }
  })

})

router.post('/updateallstock',function(req,res,next){
  console.log(req.body.length)
  q="update product set stock=? where productid=?"
  console.log(req.body)
  req.body.map(function(item,key){
  pool.query(q,[item.stock,item.productid],function(error,result){
    if(error){
        console.log(error)
return res.status(500).json({RESULT:false})
    }
  else{
    if(key+1==req.body.length){
      return res.status(200).json({RESULT:true})  
    }
  }
   })
  })
})

router.post('/updateRecord',multer.any(),function(req,res,next){
  if(!localStorage.getItem('vendortoken'))
  { return  res.status(200).json('Session has Expired Please Login Again')}
 
    console.log(req.body)
  if(req.body.picture !="" && req.body.ad !=""){
  q="update product set productname=?,description=?,price=?,offerprice=?,delivery=?,ratings=?,color=?,vendorstatus=?,adstatus=?,offertype=?,stock=?,outletid=?,categoryid=?,brandid=?,modelid=?,picture=?,ad=? where productid=?"
  pm=[req.body.productname,req.body.description,req.body.price,req.body.offerprice,req.body.delivery,
    req.body.ratings,req.body.color,req.body.vendorstatus,req.body.adstatus,req.body.offertype,
    req.body.stock,req.body.vendorid,req.body.categoryid,req.body.brandid
    ,req.body.modelid,req.files[0].originalname,req.files[1].originalname,req.body.productid]  
  }
  else if(req.body.picture !="" ){
    q="update product set productname=?,description=?,price=?,offerprice=?,delivery=?,ratings=?,color=?,vendorstatus=?,adstatus=?,offertype=?,stock=?,outletid=?,categoryid=?,brandid=?,modelid=?,picture=? where productid=?"
    pm=[req.body.productname,req.body.description,req.body.price,req.body.offerprice,req.body.delivery,
      req.body.ratings,req.body.color,req.body.vendorstatus,req.body.adstatus,req.body.offertype,
      req.body.stock,req.body.vendorid,req.body.categoryid,req.body.brandid
      ,req.body.modelid,req.files[0].originalname,req.body.productid]  
  }

  else if(req.body.ad !="" ){
    q="update product set productname=?,description=?,price=?,offerprice=?,delivery=?,ratings=?,color=?,vendorstatus=?,adstatus=?,offertype=?,stock=?,outletid=?,categoryid=?,brandid=?,modelid=?,ad=? where productid=?"
    pm=[req.body.productname,req.body.description,req.body.price,req.body.offerprice,req.body.delivery,
      req.body.ratings,req.body.color,req.body.vendorstatus,req.body.adstatus,req.body.offertype,
      req.body.stock,req.body.vendorid,req.body.categoryid,req.body.brandid
      ,req.body.modelid,req.files[0].originalname,req.body.productid]  
  }
  else{
    q="update product set productname=?,description=?,price=?,offerprice=?,delivery=?,ratings=?,color=?,vendorstatus=?,adstatus=?,offertype=?,stock=?,outletid=?,categoryid=?,brandid=?,modelid=? where productid=?"
    pm=[req.body.productname,req.body.description,req.body.price,req.body.offerprice,req.body.delivery,
      req.body.ratings,req.body.color,req.body.vendorstatus,req.body.adstatus,req.body.offertype,
      req.body.stock,req.body.vendorid,req.body.categoryid,req.body.brandid
      ,req.body.modelid,req.body.productid]  
  }
    pool.query(q,pm,function(err,result){
    if(err){
      console.log(err)
      return  res.status(500).json({RESULT:false})
    }
    else{
      return  res.status(200).json({RESULT:true})
    }
  })

})

router.get('/displayalltopproducts',function(req, res, next) {
  
  console.log(req.body)
  pool.query("select P.*,false as cartstatus from product P where P.vendorstatus='Verify' and P.offertype='Discounted'",function(err,result){
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

router.post('/listproductbycategory',function(req,res,next){
  pool.query("select P.*,false as cartstatus from product P where P.categoryid=?",[req.body.categoryid],function(err,result){
    if(err){
      return  res.status(500).json([])
    }
    else{
      console.log(result)
      return  res.status(200).json(result)
    }
  })

})


//////User/////
router.post('/displaybyid',function(req,res,next){
  console.log(req.body)
  pool.query("select P.*,(select B.brandname from brand B Where B.brandid=P.brandid) as brandname,(select M.modelname from model M Where M.modelid=P.modelid) as modelname, false as cartstatus from product P where P.productid=?",[req.body.productid],function(err,result){
    if(err){
      console.log(err)
      return  res.status(500).json([])
    }
    else{
      console.log(result)
      return  res.status(200).json(result)
    }
  })

})




module.exports = router;
