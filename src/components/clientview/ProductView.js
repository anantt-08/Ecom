
import React,{useState,useEffect} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { getData,ServerURL,postData} from '../FetchNodeServices';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import {useParams} from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import {QtyCtrl} from './QtyCtrl'
import {useDispatch,useSelector} from 'react-redux'
import Grid from '@material-ui/core/Grid';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import LocationCity from '@material-ui/icons/LocationCity';


const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
      backgroundColor:'#FFFFFF'
    },
    productpicturemedia: {
        display:'flex',
        width:'100%',
        height:'100%',
        
        
        
        
      },

      productpictureroot: {
        alignItems:'center',
        justifyContent:'center',
        display:'flex',
        //padding:0,
          width:window.screen.width*0.3,
          height:window.screen.height*0.45,
      // margin:30,
       
        // border:'1px solid #dfe6e9', 
        // borderRadius:12,
         
             },
    
}));
export default function FirstPage (props) {
    const classes = useStyles();
    var params=useParams()
    const [getList,setList]=useState(null)
    const [getListPicture,setListPicture]=useState([])
    var dispatch=useDispatch()
  var cartitems=useSelector(state=>state.cart)
  
  const [getCount,setCount]=React.useState(cartitems.length)
    const fetchProduct=async()=>{
     
        let body={'productid':params.pid}
       let list=await postData('product/displaybyid',body)
        setList(list[0])
       
     }

     const fetchProductPicture=async()=>{
        let body={'productid':params.pid}
       let list=await postData('productpicture/displaybyproductid',body)
         
       
       setListPicture(list)
       
     }


     useEffect(function(){
        fetchProduct()
        fetchProductPicture()
           },[])

           const addToCart=(item)=>{
            item['qtydemand']=1
            var list=getList
            list['cartstatus']=1
            setList(list)
            dispatch({type:"ADD_CART",payload:[item.productid,item]})
            setCount(item.productid)//only rendring
            
          
          }
          

          
const handleQtyChange=(value,item)=>
{ if(value==0)
  { 
    item['qtydemand']=value
   var list=getList
    list['cartstatus']=0
     setList(list)
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

           const showProductDetails=(item)=>{
            if(item!=null){
            console.log("mmmm",item)
                 
          var save=item.price-item.offerprice
        return(
        
        <div style={{padding:5}}>
          <div style={{display:'flex',flexDirection:'column'}}>
      
              
              
            <div style={{fontSize:20,padding:5}}>
            <b>{item.productname.length>=40?(item.productname).toString().substring(0,20)+"...":item.productname}</b>
            </div>
            <div style={{fontSize:18,color:'#b2bec3',padding:5}}>
            {item.brandname} {item.modelname} 
            </div>
            <div style={{fontSize:20,padding:5}}>
              M.R.P <s><span>&#8377;</span> {item.price}</s>
            </div>
            <div style={{fontSize:20,padding:5}}>
       
            <b>Offer <span>&#8377;</span> {item.offerprice}</b>
            </div>  
            <div style={{fontSize:20,padding:5}}>
            <small><font color='#00b894' ><b>You Save <span>&#8377;</span> {save}</b></font> Inclusive of all taxes </small>
              
            </div>

            <div style={{fontSize:20,padding:5,color:''}}>
            <font color='#00b894' >
            {item.stock==0?<b>Not Availabe</b>:item.stock>=1 && item.stock<=3?<b>Limited Stock {item.stock} items Available </b>:<b>In Stock</b>}

            </font>
            </div>  
            <div style={{fontSize:20,padding:5}}>
             Inaugural Offer <b>Free Shipping</b>
             </div>

            <div>
          { item.cartstatus==0?(<Button style={{padding:5}} variant="contained" onClick={()=>addToCart(item)} color="primary">
             Add to Cart
             </Button>):(<QtyCtrl value={1} onChange={(value)=>handleQtyChange(value,item)} />)}
            
            </div>
            <div style={{padding:15}}>
            <div style={{fontSize:16,paddingTop:15,paddingBottom:15}}>
              <b>Delivery</b>
            </div>
            <TextField
        className={classes.margin}
        id="input-with-icon-textfield"
    
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LocationCity />
            </InputAdornment>
          ),
         endAdornment:(
          <InputAdornment position="start">
            <div style={{fontSize:14,color:'red'}}>Check </div>
          </InputAdornment>
        ),
        }}
      />
      <div>
      Usually delivered in 2-3 days

      </div>
      <div>
      Enter pincode for exact delivery dates
      </div>
       
            </div>
       </div>
          
          
          
          </div>
      )
        
        
            }
          }
       
           const showProductPictures=()=>{
            //var colors=['#ffeaa7','#81ecec','#74b9ff','#e056fd']
             return(
                 
               getListPicture.map((item,key)=>{
         
         return(
         <div className={classes.productpictureroot} >
           
         
                
                <img src={`${ServerURL}/images/${item.productpicture}`} className={classes.productpicturemedia}/>
           
           
           
           </div>
             
         
         )
         }))
           }
 
   const showDescription=(item)=>{
   if(item!=null)
   {
    return(
     
    <div>
    <Divider style={{marginLeft:40,marginRight:40}}/>
    <div style={{paddingLeft:40,fontSize:20}}><b>Description</b></div>
    <div style={{paddingLeft:40,fontSize:16}}>{item.description}</div>   
    </div>
  )}}  

return( <div className={classes.grow}>
  <Header history={props.history}/>
  <Grid container>
      <Grid item xs={12} sm={6} >
      <div style={{display:'flex',flexDirection:'row'}}>
      <div style={{padding:5,marginLeft:60,width:"60%"}}>
<Carousel autoPlay showArrows={true} showIndicators={false} showStatus={false} thumbWidth={60}  >
     {showProductPictures()}
    </Carousel>
     
         
           </div>

      </div>
      </Grid>
      <Grid item xs={12} sm={6}>
         
        {showProductDetails(getList)}
      </Grid>

  </Grid>
   {showDescription(getList)}
<Footer />
</div>)

}