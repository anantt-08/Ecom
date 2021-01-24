var express = require('express');
var router = express.Router();
var pool=require('./pool')
var multer=require('./multer')

/* GET home page. */
router.post('/addpicinfo',multer.any(),function(req,res,next){
    //console.log(req.body)
    //console.log(req.files)
    q="insert into productpictures(productid,productpicture) values ?"
    pool.query(q,[req.files.map(item=>[req.body.productid,item.originalname])],function(err,result){
        if(err){
            console.log(err)
   return res.status(500).json({RESULT:false})
        }
        else{
            return res.status(200).json({RESULT:true})
        }
    })
   
})
router.post('/addpic',multer.any(),function(req,res,next){
   // console.log(req.body)
   // console.log(req.files)
    return res.status(200).json(true)

})

router.post('/displaybyid',function(req, res, next) {
  
    console.log(req.body)
    pool.query("select pp.*,p.productname,p.offertype from productpictures pp,product p where pp.productid=? and pp.productid=p.productid",[req.body.productid],function(err,result){
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

  router.post('/deleteRecord',function(req,res,next){
    if(!localStorage.getItem('vendortoken'))
    { return  res.status(200).json('Session has Expired Please Login Again')}
   
    pool.query("delete from productpictures where pictureid=?",[req.body.pictureid],function(err,result){
      if(err){
        return  res.status(500).json([])
      }
      else{
        return  res.status(200).json(result)
      }
    })
  
  })
  
  router.post('/updateRecord',multer.single('productpicture'),function(req,res,next){
   /* if(!localStorage.getItem('vendortoken'))
    { return  res.status(200).json('Session has Expired Please Login Again')}*/
    console.log(req.body)
    console.log(req.file)
    pool.query("update productpictures set productpicture=? where pictureid=?",[req.file.originalname,req.body.pictureid],function(err,result){
      if(err){
          console.log(err)
        return  res.status(500).json({RESULT:false})
      }
      else{
        return  res.status(200).json({RESULT:true})
      }
    })
  
  })
////////////////////////user/////////////

router.post('/displaybyproductid',function(req, res, next) {
  
   console.log(req.body)
   pool.query("select * from productpictures  where productid=?",[req.body.productid],function(err,result){
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
