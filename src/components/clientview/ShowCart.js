import React,{useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import IconButton from '@material-ui/core/IconButton';
import { fade, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { getData,ServerURL,postData} from '../FetchNodeServices';
import {QtyCtrl} from './QtyCtrl'

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Header from './Header'
import Footer from './Footer'

const useStyles = makeStyles((theme) => ({
    root: {
        display:'flex',
      },
     maindiv:{
     display:'flex',
     justifyContent:'center',
     alignItems:'center',
     padding:20,

     },
      paper: {
        padding: theme.spacing(1),
        width:700,
        backgroundColor:'#FFFFFF'
 
         
         
      },
      papercoupon: {
        padding: theme.spacing(1),
        width:400,
        backgroundColor:'#FFFFFF',
        padding:10
 
         
         
      },

      paperpayment: {
        padding: theme.spacing(1),
        width:400,
        backgroundColor:'#FFFFFF',
        padding:10
 
         
         
      },
}));

export default function ShowCart(props)

{ const classes = useStyles();
   const [getCount,setCount]=useState()
  var dispatch=useDispatch() 
    var cart=useSelector(state=>state.cart)
  var length=Object.keys(cart).length
  var cartitems=Object.values(cart)
  //var total=cartitems.reduce((a,b)=>a+b.price,0);
  var total=cartitems.reduce(calculate,0);
   function calculate(a,b){
   var price=b.offerprice==0?(b.price*b.qtydemand):(b.offerprice*b.qtydemand)
   return a+price

   }

   var totalsaving=cartitems.reduce(calculatesavings,0);
   function calculatesavings(a,b){
   var price=b.price-b.offerprice
   price=price*b.qtydemand
   return a+price

   }
  
  console.log('xxxxxxxx',total) 


  const handleQtyChange=(value,item,key)=>
  { if(value==0)
    { 
      item['qtydemand']=value
     // var list=getListTop
      //list[key]['cartstatus']=0
      //setListTop(list)
      dispatch({type:"REMOVE_ITEM",payload:[item.productid,item]})
      setCount(value)//only rendring
  
    }
    else
    {
    item['qtydemand']=value
    dispatch({type:"ADD_CART",payload:[item.productid,item]})
    setCount(value)//only rendring
  
  }
  }
  

  const ShowCartItems=()=>{
    return(
    <div className={classes.root}>
        <div className={classes.maindiv}>
    <div className={classes.paper}>   
    <Grid container spacing={1}>
    <Grid  item xs={12} sm={6}>
    <b>ORDER SUMMARY ({length} item(s))</b>
    </Grid>
    <Grid   style={{display:'flex',justifyContent:'flex-end'}} item xs={12} sm={6}>
     {<b><span>&#8377;</span>{total}</b>}
     </Grid>


      {cartitems.map((item,key)=>(
        
         
   <>
   
   <Grid   item xs={12} sm={4}>
   <img src={`${ServerURL}/images/${item.picture}`} width='60' height='60' />
   </Grid>

   <Grid style={{display:'flex',flexDirection:'column'}}  item xs={12} sm={4}>
   <div style={{padding:5}}>{item.productname}</div>
   {item.offerprice!=0?(<div style={{padding:5}}><b><span>&#8377;</span>{item.offerprice*item.qtydemand}</b> <s><span>&#8377;</span>{item.price}</s>    <strong style={{color:'#27ae60'}}>You save<span>&#8377;</span>&nbsp;{item.price-item.offerprice}</strong>
   </div>):(<div style={{padding:5}}><b><span>&#8377;</span>{item.price*item.qtydemand}</b></div>)}
       </Grid>

       <Grid  style={{display:'flex',justifyContent:'flex-end'}}  item xs={12} sm={4} >
   
   <QtyCtrl  value={item.qtydemand}
   onChange={(value)=>handleQtyChange(value,item,key)} 
   /> 
   </Grid>
 
    </>


      ))}
   
      
</Grid>
</div>
</div>
    </div>
   )


  }
  
  const ShowCoupon=()=>{
    return(
    <div className={classes.root} style={{flexDirection:'column'}} >
      <div className={classes.maindiv}>
         
        <div className={classes.papercoupon}>
         <div style={{fontSize:16,padding:5}}> 
        <b>Apply Coupon</b>
        </div>
        <div  style={{fontSize:14,padding:5}}>
        <a href='#'>Log in</a> to see best offers and cashback deals
        </div>
          </div> 
          

      </div>

      <div className={classes.maindiv}>

      <div className={classes.paperpayment}>
         <div style={{fontSize:16,padding:5}}> 
        <b>Payment Details</b>
        </div>
       
        <div style={{ display:'flex',flexDirection:'row',fontSize:14,padding:5}}>
        <div style={{display:'flex',justifyContent:'flex-start',width:200}}>
        MRP Total
         </div>
        <div style={{display:'flex',justifyContent:'flex-end',width:200}}>
        <span>&#8377;</span> {total}
         </div>
         </div>

         <div style={{ display:'flex',flexDirection:'row',fontSize:14,padding:5}}>
        <div style={{display:'flex',justifyContent:'flex-start',width:200}}>
        Product Discount
         </div>
        <div style={{display:'flex',justifyContent:'flex-end',width:200}}>
        <span>&#8377; </span>{totalsaving}
         </div>
         </div>
  
         <div style={{ display:'flex',flexDirection:'row',fontSize:14,padding:5}}>
        <div style={{display:'flex',justifyContent:'flex-start',width:200}}>
        Total Amount
         </div>
        <div style={{display:'flex',justifyContent:'flex-end',width:200}}>
        <span>&#8377;</span> {total-totalsaving}
         </div>
         </div>
      
         <div style={{ display:'flex',flexDirection:'row',fontSize:14,padding:5}}>
        <div style={{display:'flex',justifyContent:'flex-start',width:200}}>
       &nbsp;
         </div>
        <div style={{display:'flex',justifyContent:'flex-end',width:200}}>
         <b><font color='green'>You save <span>&#8377;</span> {totalsaving}</font></b>
         </div>
         </div>



         </div>  
      </div>      
      </div>
    )
  }

 const handleUserLogin=()=>{
  props.history.push({pathname:'\SignInClient'})

 }
   
  return(
  <div >
     <Header history={props.history} />
     <div style={{padding:30}}>
    <Grid container spacing={1}>
    <Grid item xs={12} sm={6}>
    {ShowCartItems()}    

    </Grid>
    <Grid style={{display:'flex',justifyContent:'flex-end'}} item xs={12} sm={6}>
     {ShowCoupon()}
    </Grid>
    <Grid style={{display:'flex',justifyContent:'flex-end',padding:20}} item xs={12}>
     <Button variant="contained" color="primary" style={{width:200}} onClick={()=>handleUserLogin()}>Place Order</Button>
    </Grid>
    </Grid>
      </div>
<Footer />
           </div>
    
  )

}