import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { getData,ServerURL,postData} from '../FetchNodeServices';
import Button from '@material-ui/core/Button';
import {QtyCtrl} from './QtyCtrl'
import {useDispatch,useSelector} from 'react-redux'
import Avatar from '@material-ui/core/Avatar';
import {useParams} from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
    },
   
    toproot: {
            alignItems:'center',
            justifyContent:'center',
            display:'flex',
            padding:20,
            width:'auto',
            height:'auto',
            margin:10,
            border:'1px solid #dcdde1',
            borderRadius:12,
                 },
    topmedia: {
      display:'flex',
      width:150,
      height:150,
      
      
    },
    scardview:{

        display: 'flex',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        flexWrap:'wrap'

      }, 
    
  }));
  
  
export default function CategoryInterface(props){
    const classes = useStyles();
    const [getList,setList]=useState([])
    const [getCount,setCount]=React.useState(0)
    var dispatch=useDispatch()
    var params=useParams()
    const fetchProducts=async()=>{
        
        let body={'categoryid':params.cid}
        let list=await postData('product/listproductbycategory',body)
         setList(list)
      
      }

      useEffect(function(){
       fetchProducts()

          },[])

          const showProducts=()=>{
    
            return(
                
              getList.map((item,key)=>{
             var save=item.price-item.offerprice
        return(
        <div>
        <div className={classes.toproot}>
          <div style={{display:'flex',flexDirection:'column'}}>
        <Avatar  variant="rounded" className={classes.topmedia}
             alt={item.productname} src={`${ServerURL}/images/${item.picture}`} />
           
              
              
            <div className={classes.text}>
            <b>{item.productname.length>=40?(item.productname).toString().substring(0,20)+"...":item.productname}</b>
            </div>
            <div>
              M.R.P <s><span>&#8377;</span> {item.price}</s>
            </div>
            <div>
       
            <b><span>&#8377;</span> {item.offerprice}</b>
            </div>  
            <div>
            <small><font color='green'>Save <span>&#8377;</span> {save}</font></small>
              
            </div>
            <div>
          { item.cartstatus==0?(<Button className={classes.cartbtn} variant="contained" onClick={()=>addToCart(item,key)} color="primary">
             Add to Cart
             </Button>):(<QtyCtrl onChange={(value)=>handleQtyChange(value,item,key)} />)}
            
            </div>
       
       </div>
          
          
          
          </div>
         </div>
        
        )
        }))
          }
       

          const handleQtyChange=(value,item,key)=>
          { if(value==0)
            { 
              item['qtydemand']=value
              var list=getList
              list[key]['cartstatus']=0
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
          
          
          const addToCart=(item,key)=>{
            item['qtydemand']=1
            var list=getList
            list[key]['cartstatus']=1
            setList(list)
            dispatch({type:"ADD_CART",payload:[item.productid,item]})
            setCount(item.productid)//only rendring
            
          
          }
          
          
return(<div className={classes.grow}>
  <Header />
  
    <div className={classes.scardview} >
 {showProducts()}
 </div>

 <Footer />
</div>)

}
