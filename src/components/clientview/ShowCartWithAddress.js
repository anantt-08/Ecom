import React,{useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import IconButton from '@material-ui/core/IconButton';
import { fade, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { getData,ServerURL,postData} from '../FetchNodeServices';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Header from './Header'
import Footer from './Footer'
import clsx from 'clsx';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import {checkRequire,checkEmail,checkMobile,checkPassword} from '../Checks';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

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
      button:{
        height:50

      },
      list: {
        width: 350,
        padding:30,
      },
      fullList: {
        width: 'auto',
      },

}));

export default function ShowCartWithAddress(props)

{ const classes = useStyles();
  const [getAddress1Msg,setAddress1Msg]=useState('')
  const [getAddress2Msg,setAddress2Msg]=useState('')
  const [getCityMsg,setCityMsg]=useState('')
  const [getStateMsg,setStateMsg]=useState('')
  const [getAddress1,setAddress1]=useState('')
  const [getAddress2,setAddress2]=useState('')
  const [getCity,setCity]=useState('')
  const [getStates,setStates]=useState('')
  const [getZipcode,setZipcode]=useState('')
   console.log("USER DATA:",props.location.state) 
   const [getUserData,setUserData]=useState(props.location.state.data)
    
   
   const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
      });
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


  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
   const handleSubmit=async()=>{
    setAddress1Msg('')
    setAddress2Msg('')
    setCityMsg('')
    setStateMsg('')
    
      var err=false;
    if(!checkRequire(getAddress1))
    {err=true
      setAddress1Msg(<font color='red' size='2'><i>Please enter your Address</i></font>)    
    }
    
    
    else if(!checkRequire(getAddress2))
    {err=true
      setAddress2Msg(<font color='red' size='2'><i>Please enter your Address</i></font>)    
    }
    
    else if(getCity.length==0)
    { err=true
      setCityMsg(<font color='red' size='2'><i>Please enter your City</i></font>) }
    
      else if(!checkRequire(getStates))
      {err=true
        setStateMsg(<font color='red' size='2'><i>Please enter your State</i></font>)    
      }
      if(!err)
      {   
        let body={address1:getAddress1,address2:getAddress2,zipcodek:getZipcode,city:getCity,state:getStates,mobileno:props.location.state.mobileno}
              console.log(body)          
             var result= await postData('userdetails/addAddress',body)  
                if(result.RESULT)
                {
                  body={'mobileno':getUserData[0].mobileno}
                  var user=await postData('userdetails/checkuserrecord',body)
                  setUserData(user.DATA)
                }
              }
        



   }


  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      //onClick={toggleDrawer(anchor, false)}
      //onKeyDown={toggleDrawer(anchor, false)}
    >
           <div style={{fontSize:16,padding:5}}> 
        <b>Enter Your Address....</b>
        </div> 

      <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="address1"
              placeholder="Address 1"
              name="address1"
              autoComplete="address"
              autoFocus
              size="small"       
              onChange={(event)=>{setAddress1(event.target.value)}}       
            />
            {getAddress1Msg
            }

     
      <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="address1"
              placeholder="Address 2"
              name="address1"
              autoComplete="address"
              autoFocus
              size="small"       
              onChange={(event)=>{setAddress2(event.target.value)}}       
            />
            {getAddress2Msg
            }
<TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="zipcode"
              placeholder="zipcode"
              name="zipcode"
              autoComplete="zipcode"
              autoFocus
              size="small"       
              onChange={(event)=>{setZipcode(event.target.value)}}       
            />
            

<TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="city"
              placeholder="City"
              name="city"
              autoComplete="city"
              autoFocus
              size="small"       
              onChange={(event)=>{setCity(event.target.value)}}       
            />
            {getCityMsg
            }

<TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="city"
              placeholder="State"
              name="state"
              autoComplete="state"
              autoFocus
              size="small"       
              onChange={(event)=>{setStates(event.target.value)}}       
            />
            {getStateMsg
            }     
        <div >
        <Button
        fullWidth
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<Icon>send</Icon>}
        onClick={()=>handleSubmit()}
      >
        <div style={{fontSize:14,fontWeight:'bold'}}>
        Save Address
        </div>
      </Button>
        </div>
       

    </div>
  );



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
   
        Qty:{item.qtydemand}
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


  const ShowAddress=()=>{
   if(!getUserData[0].addressstatus)
   {
   
    return(
        <div className={classes.root}>
        <div className={classes.maindiv}>
    <div className={classes.paper}>   
    
         <div style={{fontSize:16,padding:5}}> 
        <b>Delivery Address</b>
        </div>
        <div  style={{fontSize:14,padding:5}}>
       {getUserData[0].firstname} {getUserData[0].lastname}<br/>
       </div>
        <div  style={{fontSize:14,padding:5}}>
        <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<Icon>send</Icon>}
        onClick={toggleDrawer('right', true)}
      >
        <div style={{fontSize:28,fontWeight:'bold'}}>
        Add Address
        </div>
      </Button>
        </div>
          </div> 
          

      </div>
     </div>

    )
   }
   else
   {
     return(
      <div className={classes.root}>
      <div className={classes.maindiv}>
  <div className={classes.paper}>   
 
       <div style={{fontSize:16,padding:5}}> 
      <b>Delivery Address</b>
      </div>
      <div  style={{fontSize:14,padding:5}}>
       {getUserData[0].firstname} {getUserData[0].lastname}<br/>
       {getUserData[0].address1}<br/>
       {getUserData[0].address2}<br/>
       {getUserData[0].city} {getUserData[0].state} 
      </div></div></div></div>


     )


   }
  }





 const handlePayment=()=>{
  props.history.push({pathname:'\PaymentGateway'})

 }
   
  return(
  <div >
     <Header history={props.history} />
     <div style={{padding:30}}>
    <Grid container spacing={1}>
    <Grid item xs={12} sm={6}>
    {ShowAddress()}    
    {ShowCartItems()}    

    </Grid>
    <Grid style={{display:'flex',justifyContent:'flex-end'}} item xs={12} sm={6}>
     {ShowCoupon()}
    </Grid>
    {getUserData[0].addressstatus?
    <Grid style={{display:'flex',justifyContent:'flex-end',padding:20}} item xs={12}>
     <Button variant="contained" color="primary" style={{width:200}} onClick={()=>handlePayment()}>Make Payment</Button>
    </Grid>:<></>}
    </Grid>
      </div>

      <React.Fragment key={'right'}>
             <SwipeableDrawer
            anchor={'right'}
            open={state['right']}
            onClose={toggleDrawer('right', false)}
            onOpen={toggleDrawer('right', true)}
          >
            {list('right')}
          </SwipeableDrawer>
        </React.Fragment>



<Footer />
           </div>
    
  )

}