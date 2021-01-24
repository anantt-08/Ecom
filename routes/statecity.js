var express = require('express');
var router = express.Router();
var pool= require('./pool')

router.get('/displayall',function(req,res)
{
pool.query("select * from states",function(err,result){
if(err){
 return res.status(500).json([])
}
else
{
  return res.status(200).json(result)

}

})})


router.post('/displayallcities',function(req,res)
{
pool.query("select * from city where stateid=?",[req.body.stateid],function(err,result){
if(err){
 return res.status(500).json([])
}
else
{
  return res.status(200).json(result)

}

})})

module.exports = router;
