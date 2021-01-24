import React,{useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import IconButton from '@material-ui/core/IconButton';
import { fade, makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';

import Badge from '@material-ui/core/Badge';
import Grid from '@material-ui/core/Grid';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Typography from '@material-ui/core/Typography';
const useStyles = makeStyles((theme) => ({
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
          display: 'flex',
        },
      },
      popover: {
        pointerEvents: 'none',
        
      },
      paper: {
        padding: theme.spacing(1),
        width:300,
 
         
         
      },
}));

export default function ShowCartIcon(props)

{ 
  console.log("CART PROPS",props)
  const classes = useStyles();
     
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

  
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };


  const open = Boolean(anchorEl);
  const handleClick=()=>{
   props.history.push({pathname:'/ShowCart'})

  }
  const ShowCartItems=()=>{
    return(
    <div className={classes.paper}>   
    <Grid container spacing={1}>
    <Grid  item xs={12} sm={6}>
    <b>ORDER SUMMARY</b>
    </Grid>
    <Grid   style={{display:'flex',justifyContent:'flex-end'}} item xs={12} sm={6}>
     {length} item(s)
     </Grid>


      {cartitems.map((item)=>(
   <>
   <Grid   item xs={12} sm={6}>
   {item.productname}
   </Grid>

   <Grid  style={{display:'flex',justifyContent:'flex-end'}} item xs={12} sm={6}>
   <span>&#8377;</span>&nbsp;{item.offerprice==0?item.price:item.offerprice} X {item.qtydemand}
   </Grid>
    </>

      ))}
   <Grid  style={{display:'flex',flexDirection:'column', justifyContent:'flex-end'}} item xs={12} sm={6}>
   
   <div><b><span>&#8377;</span>&nbsp;{total}</b></div>
    <small style={{color:'#27ae60'}}>You save<span>&#8377;</span>&nbsp;{totalsaving}</small>
   
   </Grid>
   <Grid  style={{display:'flex',justifyContent:'flex-end'}}  item xs={12} sm={6}>
   <Button variant="contained" color="primary">
        Show Cart
      </Button>
   </Grid>
 
      
</Grid>
</div>
   )


  }
  
  return(
  <div>
      <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit" aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
    onMouseLeave={handlePopoverClose}
   onClick={()=>handleClick()}
       
   >
              <Badge badgeContent={length} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>

            <Popover
        id="mouse-over-popover"
        className={classes.popover}
       
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
      {ShowCartItems()}     

      </Popover>
           </div>
           </div>
    
  )

}